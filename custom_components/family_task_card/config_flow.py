"""Config flow for the Family Task Card integration.

Minimal skeleton: a single-instance setup that creates the entry and lets the
integration serve the card. The real configuration (family members, their
``todo.*`` lists / providers, points and rewards) is on the roadmap and will
grow the config/options flow – see ROADMAP.md.
"""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import DOMAIN


class FamilyTaskCardConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the initial setup."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Single instance: confirm to add the card."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(title="Family Task Card", data={})

        return self.async_show_form(step_id="user", data_schema=vol.Schema({}))
