"""Constants for the Family Task Card integration."""

DOMAIN = "family_task_card"
VERSION = "1.0.0"

# Config entry data / options keys
CONF_PRESETS = "presets"
CONF_CUSTOM = "custom"
CONF_SCAN_INTERVAL = "scan_interval"

# Defaults
DEFAULT_SCAN_INTERVAL = 30  # minutes
DEFAULT_MAX_ENTRIES = 15    # headlines kept per feed

# URL under which the bundled card JavaScript is served.
CARD_URL = "/family_task_card/family-task-card.js"
CARD_FILENAME = "family-task-card.js"
