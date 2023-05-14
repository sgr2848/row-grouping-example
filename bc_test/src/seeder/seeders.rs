use crate::model::response_model::Payments;
use fake::{
    faker::{address::raw::CountryName, currency::raw::CurrencyName, name::raw::Name},
    locales::*,
    Fake,
};
use rand::prelude::*;
use sqlx::{query, PgPool};

pub fn generate_random_payments(amt: usize) -> Vec<Payments> {
    let mut payment_vec: Vec<Payments> = Vec::new();
    let mut rng = rand::thread_rng();
    for _ in 0..amt {
        let rid: u8 = rng.gen();
        let amount: f64 = rng.gen();
        let discount_amount: f64 = rng.gen();
        let name: String = Name(EN).fake();
        let cnt: String = CountryName(EN).fake();
        let curr: String = CurrencyName(EN).fake();
        payment_vec.push(Payments {
            refund_id: rid as i64,
            customer: name,
            country: cnt,
            amount: amount,
            payment_currency: curr,
            discount_amount: discount_amount,
        })
    }
    payment_vec
}

pub async fn seed_db(pg_conn: &PgPool) -> anyhow::Result<()> {
    let mut tx = pg_conn.begin().await?;
    let data = generate_random_payments(100000);
    for i in 0..data.len() {
        let er = query!("INSERT INTO payments(refund_id,customer,country,amount,payment_currency,discount_amount) values($1,$2,$3,$4,$5,$6)",data[i].refund_id,data[i].customer,data[i].country,data[i].amount,data[i].payment_currency,data[i].discount_amount).execute(&mut tx).await.expect("Failed to execute transaction");
    }
    tx.commit().await?;
    Ok(())
}
