use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestData {
    pub max_depth: usize,
    pub current_depth: usize,
    pub columns: Vec<String>,
    pub col_values: Vec<String>,
}
