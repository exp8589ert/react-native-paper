import color from 'color';
import * as React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Text from '../Typography/Text';
import Icon, { IconSource } from '../Icon';
import TouchableRipple from '../TouchableRipple/TouchableRipple';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';
import { black } from '../../styles/themes/v2/colors';

type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * The label text of the item.
   */
  label: string;
  /**
   * Icon to display for the `DrawerItem`.
   */
  icon?: IconSource;
  /**
   * Whether to highlight the drawer item as active.
   */
  active?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Callback which returns a React element to display on the right side. For instance a Badge.
   */
  right?: (props: { color: string }) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
};

/**
 * A component used to show an action item with an icon and a label in a navigation drawer.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/drawer-item.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Drawer } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *    <Drawer.Item
 *      style={{ backgroundColor: '#64ffda' }}
 *      icon="star"
 *      label="First Item"
 *    />
 * );
 *
 * export default MyComponent;
 * ```
 */
const DrawerItem = ({
  icon,
  label,
  active,
  theme,
  style,
  onPress,
  accessibilityLabel,
  right,
  ...rest
}: Props) => {
  const { colors } = theme;
  const backgroundColor = active
    ? color(colors?.primary).alpha(0.12).rgb().string()
    : 'transparent';
  const contentColor = active
    ? colors?.primary
    : color(colors?.text).alpha(0.68).rgb().string();
  const font = theme.fonts.medium;
  const labelMargin = icon ? 12 : 0;

  return (
    <View {...rest}>
      <TouchableRipple
        borderless
        delayPressIn={0}
        onPress={onPress}
        style={[styles.container, { backgroundColor, borderRadius: 28 }, style]}
        // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
        accessibilityTraits={active ? ['button', 'selected'] : 'button'}
        accessibilityComponentType="button"
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        accessibilityLabel={accessibilityLabel}
      >
        <View style={styles.wrapper}>
          <View style={styles.content}>
            {icon ? (
              <Icon source={icon} size={24} color={contentColor} />
            ) : null}
            <Text
              selectable={false}
              numberOfLines={1}
              style={[
                styles.label,
                {
                  color: contentColor,
                  ...font,
                  marginLeft: labelMargin,
                },
              ]}
            >
              {label}
            </Text>
          </View>

          <View style={styles.rightContent}>
            {right?.({ color: contentColor || black })}
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

DrawerItem.displayName = 'Drawer.Item';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 56,
    marginLeft: 12,
    marginRight: 12,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 24,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 32,
  },
  rightContent: {
    // paddingLeft: 12,
  },
});

export default withTheme(DrawerItem);
