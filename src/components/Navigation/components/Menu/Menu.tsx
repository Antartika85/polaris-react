import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {autobind, memoize} from '@shopify/javascript-utilities/decorators';
import {IconableAction} from '../../../../types';
import MessageIndicator from '../../../MessageIndicator';
import Icon, {Props as IconProps} from '../../../Icon';
import Message, {Props as MessageProps} from '../Message';
import {ActionItem} from './components';
import * as styles from './Menu.scss';

interface ActionSection {
  id: string;
  items: IconableAction[];
}

export interface Props {
  actions?: ActionSection[];
  children?: React.ReactNode;
  message?: MessageProps;
  avatar: React.ReactNode;
  title?: string;
  detail?: string;
  activatorAccessibilityLabel?: string;
}

interface State {
  menuExpanded?: boolean;
}

export default class Menu extends React.PureComponent<Props, State> {
  state: State = {
    menuExpanded: false,
  };

  render() {
    const {
      actions,
      children,
      message,
      avatar,
      title,
      detail,
      activatorAccessibilityLabel,
    } = this.props;
    const {menuExpanded} = this.state;

    const className = classNames(styles.Menu, menuExpanded && styles.expanded);

    const itemClassName = styles.Item;
    const tabIndex = menuExpanded ? 0 : -1;

    const itemsMarkup =
      actions &&
      actions.map((section) => {
        return (
          <div className={styles.Section} key={section.id}>
            {section.items.map((item) => (
              <ActionItem
                key={item.content}
                icon={item.icon as IconProps['source']}
                tabIndex={tabIndex}
                url={item.url}
                className={itemClassName}
                onClick={
                  !item.url && item.onAction
                    ? this.createActionHandler(item.onAction)
                    : this.handleClick
                }
              >
                {item.content}
              </ActionItem>
            ))}
          </div>
        );
      });

    const badgeProps = message &&
      message.badge && {
        content: message.badge.content,
        status: message.badge.status,
      };
    const messageMarkup = message && (
      <div className={styles.Section}>
        <Message
          title={message.title}
          description={message.description}
          action={{
            onClick: message.action.onClick,
            content: message.action.content,
          }}
          link={{to: message.link.to, content: message.link.content}}
          badge={badgeProps}
        />
      </div>
    );

    const showIndicator = Boolean(message);

    return (
      <div className={className}>
        <button
          type="button"
          className={styles.Button}
          onClick={this.handleClick}
          onMouseUp={handleMouseUp}
        >
          <span className={styles.Avatar}>
            <MessageIndicator active={showIndicator}>{avatar}</MessageIndicator>
          </span>
          <span className={styles.Details}>
            <span className={styles.Name}>{title}</span>
            <span className={styles.Detail}>{detail}</span>
          </span>
          <span className={styles.DisclosureIcon}>
            <Icon
              source="chevronDown"
              color="inkLightest"
              accessibilityLabel={activatorAccessibilityLabel}
            />
          </span>
        </button>
        <div className={styles.ContentWrapper} aria-hidden={!menuExpanded}>
          <div className={styles.Content}>
            {itemsMarkup}
            {children}
            {messageMarkup}
          </div>
        </div>
      </div>
    );
  }

  @memoize()
  private createActionHandler(handler: () => void) {
    return () => {
      handler();
      this.handleClick();
    };
  }

  @autobind
  private handleClick() {
    this.setState(({menuExpanded}) => ({
      menuExpanded: !menuExpanded,
    }));
  }
}

function handleMouseUp({currentTarget}: React.MouseEvent<HTMLButtonElement>) {
  currentTarget.blur();
}
