# Use GCP Provider
terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "5.34.0"
    }
  }
}

# Configure GCP provider 
provider "google" {
  project      = "" # Fill with actual "project id"
  region       = "" # Fill with desired "region" or "compute zone" 
}