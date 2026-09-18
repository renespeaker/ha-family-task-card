"""Task coordinator for the Family Task Card integration.

Skeleton for the task engine. The plan (see ROADMAP.md) is to read family
tasks from Home Assistant ``todo.*`` entities – which is how the Apple
Reminders, Todoist, Google Tasks, Bring! and Local To-do integrations expose
their lists – so the card works provider-agnostically and bidirectionally
(completing a task in the card checks it off in the source app).

For now this returns an empty task set; no external service is polled.
"""

from __future__ import annotations

from datetime import timedelta
import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator

from .const import DEFAULT_SCAN_INTERVAL, DOMAIN

_LOGGER = logging.getLogger(__name__)


class FamilyTaskCoordinator(DataUpdateCoordinator[dict]):
    """Collect the family's tasks (future: from ``todo.*`` entities)."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        """Initialise the coordinator from a config entry."""
        self.entry = entry
        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
            update_interval=timedelta(minutes=DEFAULT_SCAN_INTERVAL),
        )

    async def _async_update_data(self) -> dict:
        """Build the current task state.

        TODO (roadmap): resolve the configured ``todo.*`` entities per family
        member, read their items, and map them to gamified tasks (assignee,
        points, due, source provider). Bring! shopping lists become a single
        "shopping" errand. See ROADMAP.md.
        """
        return {"members": [], "tasks": []}
