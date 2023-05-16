#[macro_use]
extern crate dotenv_codegen;
pub mod handler;
pub mod model;
pub mod seeder;
pub mod service;
use axum::{routing::post, Router};
use sqlx::postgres::PgPoolOptions;

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
        .with_state(pg_pool);
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
