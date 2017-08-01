import React, { Component } from "react";
import { AppBar, IconButton, IconMenu, MenuItem } from "material-ui";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";

const Menu = props => {
  return (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton>
          <NavigationMenu />
        </IconButton>
      }
      targetOrigin={{ horizontal: "top", vertical: "bottom" }}
      anchorOrigin={{ horizontal: "bottom", vertical: "top" }}
    >
      <MenuItem primaryText="Drivers" />
      <MenuItem primaryText="Services" />
      <MenuItem primaryText="Stored Info" />
      <MenuItem primaryText="Log out" />
    </IconMenu>
  );
};

Menu.muiName = "IconMenu";

class TopBar extends Component {
  render() {
    return (
      <div>
        <AppBar title="Admin" iconElementLeft={<Menu />} />
      </div>
    );
  }
}

export default TopBar;
