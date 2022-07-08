import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { message, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { LoginForm, ProFormText } from "@ant-design/pro-form";
import { FormattedMessage, history, useIntl, useModel } from "umi";
import Footer from "@/components/Footer";

import styles from "./index.less";
import { fetchBaseAuthInfo, fetchServiceInfo } from "@/services/youphoto/api";

type LoginResult = {
  token: string;
  username: string;
}

const Login: React.FC = () => {
  const [authInfo, setAuthInfo] = useState<API.AuthInfo | undefined>();
  const { initialState, setInitialState } = useModel("@@initialState");
  const [serviceInfo, setServiceInfo] = useState<API.ServiceInfo | undefined>();
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo
      }));
    }
  };
  const setLoginType = (name: string) => {
    if (!serviceInfo) {
      return;
    }
    const result: API.AuthInfo | undefined = serviceInfo.auth.find(it => it.name === name);
    if (result) {
      setAuthInfo(result);
    }
  };
  const baseLogin = async (values: { username: string, password: string }): Promise<LoginResult | undefined> => {
    if (!authInfo) {
      return undefined;
    }
    const response = await fetchBaseAuthInfo({
      url: authInfo.url,
      username: values.username,
      password: values.password
    });
    return {
      token: response.data.accessToken,
      username: response.data.username
    };
  };
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      if (!authInfo) {
        return;
      }
      // 登录
      let loginResult: LoginResult | undefined;
      if (authInfo.type == "base") {
        if (!values.username || !values.password) {
          return;
        }
        loginResult = await baseLogin({ username: values.username, password: values.password });
      }
      if (loginResult) {
        localStorage.setItem("token", loginResult.token);
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: "pages.login.success",
          defaultMessage: "登录成功！"
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || "/");
        return;
      }
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: "pages.login.failure",
        defaultMessage: "登录失败，请重试！"
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  const initPage = async () => {
    const serviceInfoResponse = await fetchServiceInfo();
    if (serviceInfoResponse) {
      setServiceInfo(serviceInfoResponse);
      if (serviceInfoResponse.auth.length > 0) {
        setAuthInfo(serviceInfoResponse.auth[0]);
      }
    }

  };
  useEffect(() => {
    initPage();
  }, []);
  return (
    <div className={styles.container}>

      <div className={styles.content}>
        {
          serviceInfo && (
            <LoginForm
              logo={<img alt="logo" src="/logo.svg" />}
              title="Ant Design"
              subTitle={intl.formatMessage({ id: "pages.layouts.userLayout.title" })}
              initialValues={{
                autoLogin: true
              }}
              onFinish={async (values) => {
                await handleSubmit(values as API.LoginParams);
              }}
            >
              <Tabs activeKey={authInfo?.name} onChange={(key) => setLoginType(key)}>
                {
                  serviceInfo.auth.map(it => (
                    <Tabs.TabPane
                      key={it.name}
                      tab={it.name}
                    />
                  ))
                }
              </Tabs>
              {authInfo && authInfo.type === "base" && (
                <>
                  <ProFormText
                    name="username"
                    fieldProps={{
                      size: "large",
                      prefix: <UserOutlined className={styles.prefixIcon} />
                    }}
                    placeholder={intl.formatMessage({
                      id: "pages.login.username.placeholder",
                      defaultMessage: "用户名: admin or user"
                    })}
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="pages.login.username.required"
                            defaultMessage="请输入用户名!"
                          />
                        )
                      }
                    ]}
                  />
                  <ProFormText.Password
                    name="password"
                    fieldProps={{
                      size: "large",
                      prefix: <LockOutlined className={styles.prefixIcon} />
                    }}
                    placeholder={intl.formatMessage({
                      id: "pages.login.password.placeholder",
                      defaultMessage: "密码: ant.design"
                    })}
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="pages.login.password.required"
                            defaultMessage="请输入密码！"
                          />
                        )
                      }
                    ]}
                  />
                </>
              )}
            </LoginForm>
          )
        }
      </div>
      <Footer />
    </div>
  );
};

export default Login;
