module "continuity_db" {
  source = "./modules/database"

  db_name = "service_continuity_metadata"
}

module "continuity_cache" {
  source = "./modules/redis"

  cluster_mode = false
}

module "continuity_monitoring" {
  source = "./modules/monitoring"

  retention_days = 90
}

resource "kubernetes_namespace" "continuity_system" {
  metadata {
    name = "platform-continuity"
    labels = {
      "platform.ops/managed" = "true"
    }
  }
}

resource "kubernetes_config_map" "continuity_configs" {
  metadata {
    name      = "calendar-engine-configs"
    namespace = kubernetes_namespace.continuity_system.metadata[0].name
  }

  data = {
    "conflict-buffer" = "30"
    "max-duration"    = "72"
    "approval-mode"   = "RBAC"
  }
}
