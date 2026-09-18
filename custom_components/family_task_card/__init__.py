"""The Family Task Card integration.

A gamified family task / chore card for Home Assistant, in the visual language
of the Family Board Card and theme-aware (uses HA CSS variables).

This module is currently an integration skeleton: it registers the config
entry and serves + auto-registers the Lovelace card. The task engine that
reads and writes family tasks from HA ``todo.*`` entities (Apple Reminders,
Todoist, Google Tasks, Bring!, local to-do lists) is on the roadmap – see
ROADMAP.md.
"""

from __future__ import annotations

import logging
import os

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import CARD_FILENAME, CARD_URL, DOMAIN, VERSION
from .coordinator import FamilyTaskCoordinator

_LOGGER = logging.getLogger(__name__)

PLATFORMS = ["sensor"]


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Family Task Card from a config entry."""
    hass.data.setdefault(DOMAIN, {})

    coordinator = FamilyTaskCoordinator(hass, entry)
    await coordinator.async_config_entry_first_refresh()
    hass.data[DOMAIN][entry.entry_id] = coordinator

    await _async_register_card(hass)

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    return True


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload the entry when its options change."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id, None)
    return unload_ok


async def _async_register_card(hass: HomeAssistant) -> None:
    """Serve the bundled card JS and auto-load it in the frontend (once)."""
    if hass.data[DOMAIN].get("_card_registered"):
        return

    path = os.path.join(os.path.dirname(__file__), CARD_FILENAME)

    try:
        from homeassistant.components.http import StaticPathConfig

        await hass.http.async_register_static_paths(
            [StaticPathConfig(CARD_URL, path, cache_headers=False)]
        )
    except ImportError:
        hass.http.register_static_path(CARD_URL, path, cache_headers=False)
    except RuntimeError:
        pass

    try:
        from homeassistant.components.frontend import add_extra_js_url

        add_extra_js_url(hass, f"{CARD_URL}?v={VERSION}")
    except Exception as err:  # noqa: BLE001 - non-fatal; manual resource still works
        _LOGGER.warning(
            "Family Task Card: could not auto-register the card resource "
            "(add it manually as %s): %s",
            CARD_URL,
            err,
        )

    hass.data[DOMAIN]["_card_registered"] = True
