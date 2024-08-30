# Cloud SQL
# See versions at https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database_instance#database_version
resource "google_sql_database_instance" "instance" {
  name             = "db-instance-name"
  region           = "asia-southeast2"
  database_version = "MYSQL_8_0"
  settings {
    tier = "db-f1-micro"
    ip_configuration {
      authorized_networks {
        name            = "network-1"
        value           = "0.0.0.0/0"
        #expiration_time = "3021-11-15T16:19:00.094Z"
      }
    }
  }
}

# Create a "database" to desired sql database instance
resource "google_sql_database" "database" {
  name     = "database-name"
  instance = google_sql_database_instance.instance.name

  # ignore creation if the database's exist based on "name"
  lifecycle {
    ignore_changes = [name]
  }
}

# Create a "database user information" for access desired sql database instance
resource "google_sql_user" "users" {
  name     = "type-a-username"  
  instance = google_sql_database_instance.instance.name
  host     = "%" # Allow access from any IP address (this approach is risky, the best practices is using sql proxy)
  password = "type-a-password"
}

# Create an "Artifact Registry" docker image repository
resource "google_artifact_registry_repository" "my-repo" {
  location      = "asia-southeast2"
  repository_id = "docker-repoo-firman"
  description   = "Sebuah repository yang berisi docker images untuk aplikasi node js yang telah dibuild"
  format        = "DOCKER"

  docker_config {
    immutable_tags = false
  }
}

# Create an "Cloud Storage" bucket for store sql dump files to being imported to database instance
resource "google_storage_bucket" "sql-file-bucket" {
  name          = "sql-file-bucket-1"
  location      = "US"
  uniform_bucket_level_access = true 
}

#Cloud Run service, this created after "Cloud SQL, Artifact Registry, Cloud Storage is ready"
variable "image_tag" {
  default = "latest"
}

resource "google_project_service" "cloud_run_api" {
  service = "run.googleapis.com"
}

resource "google_cloud_run_v2_service" "final-project-skripsi-firman" {
  name     = "cloudrun-inslope" 
  location = "asia-southeast2"
  #ingress = "INGRESS_TRAFFIC_ALL"
  client   = "terraform"

  template { # Using latest container template in "Artifact Registry"
    containers {
      image = "asia-southeast2-docker.pkg.dev/prime-hologram-395812/docker-repoo-firman/docker-images-firman:${var.image_tag}"
    }
  }
  depends_on = [
    google_project_service.cloud_run_api
  ]
  traffic {
      type = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
      percent = 100
  }

  # Ignore creation if the cloud run services exist based on "name"
  lifecycle {
    ignore_changes = [name]
  }
}

# Set public access using invoker roles for all user
resource "google_cloud_run_v2_service_iam_member" "noauth" {
  location = google_cloud_run_v2_service.final-project-skripsi-firman.location
  name     = google_cloud_run_v2_service.final-project-skripsi-firman.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Show URL on log
output "url" {
  value = google_cloud_run_v2_service.final-project-skripsi-firman.uri
}