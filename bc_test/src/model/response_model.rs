use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use std::fmt::Debug;

#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseData<T>
where
    T: Debug + Serialize,
{
    pub data: Vec<T>,
    pub count: usize,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct StingyData {
    name: String,
    count: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Payments {
    pub refund_id: i64,
    pub customer: String,
    pub country: String,
    pub amount: f64,
    pub payment_currency: String,
    pub discount_amount: f64,
}
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct FilteredPayments {
    pub refund_id: i64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub customer: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub country: Option<String>,
    pub amount: f64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub payment_currency: Option<String>,
    pub discount_amount: f64,
}
