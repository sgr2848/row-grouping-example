#[macro_use]
extern crate dotenv_codegen;
pub mod handler;
pub mod model;
pub mod seeder;
pub mod service;
use axum::{http::{Method,header}, routing::post, Router};
use hyper::http::HeaderValue;
use sqlx::postgres::PgPoolOptions;
use tower_http::cors::{CorsLayer,Any};

#[tokio::main]
async fn main() {
    let db_url = dotenv!("DATABASE_URL");
    let pg_pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("Cannot connect to database");

    let _seeding = seeder::seeders::seed_db(&pg_pool).await.expect("msg");
    // run it with hyper on localhost:3000
    let app = Router::new()
        .route("/data", post(handler::handler::handle_request))
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_headers([header::CONTENT_TYPE,header::ACCEPT])
                .allow_methods([Method::GET, Method::POST,Method::OPTIONS]),
        )
        .with_state(pg_pool);
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
