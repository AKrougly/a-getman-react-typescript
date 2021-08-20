import { useHistory } from "react-router-dom";
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

interface IDrawerItem {
  type: string
  title: string
  href: string
  Icon: any
}

const DrawerItem: React.FC<IDrawerItem> = ({ type, title, href, Icon }) => {
  const LARGER = false;
  const { push } = useHistory();

  if (type === "divider") {
    return <Divider />;
  } else if (type === "item") {
    const isLink = !!href;
    const isExternal = isLink && href.startsWith("http");
    return (
      <ListItem
        button={isLink}
        title={title}
        onClick={
          isExternal
            ? () => window.open(href)
            : isLink
            ? () => push(href)
            : null
        }
      >
        {!!Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={title} />
        {LARGER && (
          <ListItemIcon>
            <span />
          </ListItemIcon>
        )}
      </ListItem>
    );
  }
  return (
    <ListItem>
      <ListItemText primary={type} secondary="Unknown type" />
    </ListItem>
  );
};

export default DrawerItem;