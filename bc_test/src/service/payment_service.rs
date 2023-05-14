use crate::model;
use sqlx::PgPool;
use std::collections::HashMap;

pub async fn get_all_data(conn: &PgPool) -> anyhow::Result<Vec<model::response_model::Payments>> {
    let data = sqlx::query_as!(model::response_model::Payments,"SELECT refund_id,customer,country,amount,payment_currency,discount_amount from payments order by amount desc limit 100").fetch_all(conn).await?;
    Ok(data)
}
pub async fn get_stingy_data(
    conn: &PgPool,
    columns: Vec<String>,
    col_values: Vec<String>,
    current_depth: usize,
) -> anyhow::Result<Vec<model::response_model::StingyData>> {
    let qry = get_query_for_stingy_data(columns, col_values, current_depth);
    let data = sqlx::query_as::<_, model::response_model::StingyData>(&qry)
        .fetch_all(conn)
        .await?;
    Ok(data)
}

fn get_query_for_stingy_data(
    columns: Vec<String>,
    col_values: Vec<String>,
    current_depth: usize,
) -> String {
    let mut val = String::new();
    let selected_col = &columns[current_depth - 1];

    val = format!(
        "SELECT count({}) as count,{} as name from payments",
        selected_col, selected_col
    );
    for i in 0..col_values.len() {
        if i == current_depth - 1 {
            break;
        } else {
            let col = &columns[i];
            let col_val = &col_values[i];
            if i > 0 {
                val = format!("{} and {}='{}'", val, col, col_val);
            } else {
                val = format!("{} where {}='{}'", val, col, col_val);
            }
        }
    }
    val = format!("{} group by name order by count desc", val);
    println!("{:?}", &val);
    val
}
fn get_query_for_filtered_data<'a>(
    col_vals: HashMap<&'a str, &'a str>,
    all_cols_fetched: Vec<&'a str>,
) -> String {
    let mut select_portion = String::new();
    let mut condition_portion = String::new();
    let mut condition_first_set = false;
    all_cols_fetched.into_iter().enumerate().for_each(|(i, k)| {
        if (col_vals.contains_key(k)) {
            let val = col_vals.get(k).unwrap();
            if (!condition_first_set) {
                condition_portion = format!("{} = '{}'", &k, val);
                condition_first_set = true;
            } else {
                condition_portion = format!("{} and {} = '{}'", condition_portion, &k, val);
            }
            if (i == 0) {
                select_portion = format!("null as {}", &k);
            } else {
                select_portion = format!("{},null as {}", select_portion, &k);
            }
        } else {
            if (i == 0) {
                select_portion = format!("{}", &k);
            } else {
                select_portion = format!("{},{}", select_portion, &k);
            }
        }
    });
    let qry = format!(
        "SELECT {} FROM payments WHERE {}",
        select_portion, condition_portion
    );
    println!("{:?}", &qry);
    qry
}
pub async fn get_filtered_data(
    conn: &PgPool,
    columns: Vec<String>,
    col_values: Vec<String>,
) -> anyhow::Result<Vec<model::response_model::FilteredPayments>> {
    let mut col_val_map = HashMap::new();
    for i in 0..columns.len() {
        col_val_map.insert(columns[i].as_str(), col_values[i].as_str());
    }
    let query = get_query_for_filtered_data(
        col_val_map,
        vec![
            &"refund_id",
            &"customer",
            &"country",
            &"amount",
            &"payment_currency",
            &"discount_amount",
        ],
    );
    let data = sqlx::query_as::<_, model::response_model::FilteredPayments>(&query)
        .fetch_all(conn)
        .await?;
    Ok(data)
}
