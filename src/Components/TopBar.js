import React, { Component } from "react";
import { AppBar, IconButton, IconMenu, MenuItem } from "material-ui";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import { browserHistory } from "react-router";

const Menu = props => {
  return (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton>
          <NavigationMenu />
        </IconButton>
      }
      targetOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem primaryText="Drivers" />
      <MenuItem
        primaryText="Test"
        onTouchTap={() => browserHistory.push("/test")}
      />
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
        <AppBar
          style={{ position: "fixed", top: 0 }}
          title="Todo"
          iconElementLeft={<Menu />}
        />
      </div>
    );
  }
}

export default TopBar;
