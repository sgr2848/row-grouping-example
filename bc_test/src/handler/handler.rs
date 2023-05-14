use crate::{
    model::{
        request_model::RequestData,
        response_model::{FilteredPayments, Payments, ResponseData, StingyData},
    },
    service::payment_service::{get_all_data, get_filtered_data, get_stingy_data},
};
use anyhow;
use axum::{
    extract::{Json, State},
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde::Serialize;
use serde_json::{json, Value};
use sqlx::postgres::PgPool;
use std::{fmt::Debug, todo};
pub async fn handle_request(
    State(pool): State<PgPool>,
    json_body: Json<RequestData>,
) -> Result<Json<Value>, AppError> {
    let data: RequestData = json_body.0;
    if data.max_depth == 0 {
        println!("Giving you all my love");
        let data = get_all_data(&pool).await?;
        let length = &data.len();
        let val = serde_json::to_value::<ResponseData<Payments>>(ResponseData {
            data: data,
            count: *length,
        })
        .unwrap();
        return Ok(Json(val));
    } else {
        if data.max_depth == data.current_depth {
            if data.col_values.len() != data.columns.len() {
                return Err(AppError(anyhow::anyhow!("Must be same length")));
            }
            let data = get_filtered_data(&pool, data.columns, data.col_values).await?;
            let length = &data.len();
            let val = serde_json::to_value::<ResponseData<FilteredPayments>>(ResponseData {
                data: data,
                count: *length,
            })
            .unwrap();
            return Ok(Json(val));
        } else {
            let data =
                get_stingy_data(&pool, data.columns, data.col_values, data.current_depth).await?;
            let length = &data.len();
            let val = serde_json::to_value::<ResponseData<StingyData>>(ResponseData {
                data: data,
                count: *length,
            })
            .unwrap();
            return Ok(Json(val));
        }
    }
    Ok(Json(json!({"hello":22})))
}
pub struct AppError(anyhow::Error);

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Something went wrong: {}", self.0),
        )
            .into_response()
    }
}
impl<E: Into<anyhow::Error>> From<E> for AppError {
    fn from(err: E) -> Self {
        Self(err.into())
    }
}
