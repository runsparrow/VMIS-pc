import { Avatar, Dropdown, Menu } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const GlobalHeaderRight = props => {
  const { dispatch,theme, layout, userinfo } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }
  const hanlderlogout = () => {
    dispatch({
      type: 'login/logout',
    });
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={() => hanlderlogout()}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={className}>
      <Dropdown overlay={menu}>
        <span>
          <Avatar icon="user" style={{ marginRight: "10px" }} />
          {Object.keys(userinfo).length>0 ? userinfo.user.realName : ""}
        </span>
      </Dropdown>
    </div>
  );
};

export default connect(({ settings, user }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  userinfo: user.userinfo
}))(GlobalHeaderRight);
