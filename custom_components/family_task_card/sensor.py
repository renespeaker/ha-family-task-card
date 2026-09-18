"""Sensor platform for the Family Task Card integration.

Skeleton. The plan (see ROADMAP.md) is to expose per-member task summaries
(e.g. ``sensor.family_task_<member>`` with open/done counts, points and a
list of tasks) that the card reads, plus a family summary. No entities are
created yet.
"""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .coordinator import FamilyTaskCoordinator


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up task sensors (none yet – roadmap)."""
    coordinator: FamilyTaskCoordinator = hass.data[DOMAIN][entry.entry_id]
    # TODO (roadmap): create one summary sensor per configured family member
    # from coordinator.data, each carrying its task list for the card.
    _ = coordinator
    async_add_entities([])
