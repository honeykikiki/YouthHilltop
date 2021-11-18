import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import LoginLayout from '../components/LoginLayout';
import useInput from '../hooks/useInput';
import {
  DUPLICATE_CHECK_REQUEST,
  SIGN_UP_REQUEST,
  LOGIN_FAILD,
} from '../reducers/user';
import style from '../styles/css/loginForm.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const { signUpDone, duplicateCheckDone, duplicateCheckDisplay, signUpFaild } =
    useSelector((state) => state.user);

  const [mem_id, onChangemem_id, setMEM_ID] = useInput('');
  const [mem_pw, onChangePassword, setPassword] = useInput('');
  const [mem_name, onChangeName, setName] = useInput('');
  const [mem_phone, onChangePhone, setPhone] = useInput('');
  const [mem_nickname, onChangeNickname, setNickname] = useInput('');
  const [agree, onChangeAgree, setAgree] = useInput(false);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const checkInput = useRef();

  useEffect(() => {
    if (signUpDone) {
      alert(`${mem_id}님 회원가입이 완료되었습니다`);
      Router.replace('/');
    }
  }, [signUpDone]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== mem_pw);
    },
    [mem_pw],
  );

  const checkboxClick = useCallback(
    (e) => {
      setAgree((prev) => !prev);
      if (checkInput.current.checked === true) {
        checkInput.current.checked = false;
      } else {
        checkInput.current.checked = true;
      }
    },

    [agree],
  );

  const onSubmitSignUp = useCallback(
    (e) => {
      e.preventDefault();
      if (mem_id === '') {
        dispatch({
          type: LOGIN_FAILD,
        });
        return;
      }

      const formIdData = new FormData();
      formIdData.append('mem_id', mem_id);

      // if (duplicateCheckDisplay) {
      //   dispatch({
      //     type: DUPLICATE_CHECK_REQUEST,
      //     data: formIdData,
      //   });
      //   return;
      // }

      if (
        mem_pw === '' ||
        mem_pw !== passwordCheck ||
        passwordError ||
        mem_name === '' ||
        mem_phone === '' ||
        mem_nickname === '' ||
        agree === false ||
        duplicateCheckDone === false
      ) {
        dispatch({
          type: LOGIN_FAILD,
        });
        return;
      }

      const formData = new FormData();
      formData.append('mem_id', mem_id);
      formData.append('mem_pw', mem_pw);
      formData.append('mem_name', mem_name);
      formData.append('mem_nickname', mem_nickname);
      formData.append('mem_phone', mem_phone);
      formData.append('mem_flag', agree);

      dispatch({
        type: SIGN_UP_REQUEST,
        data: formData,
      });
    },
    [
      mem_id,
      mem_pw,
      mem_name,
      mem_phone,
      mem_nickname,
      agree,
      duplicateCheckDisplay,
    ],
  );

  return (
    <LoginLayout>
      <form className={style.form} onSubmit={onSubmitSignUp}>
        <input
          name="mem_id"
          placeholder="이메일를 입력해주세요"
          value={mem_id}
          onChange={onChangemem_id}
          type="email"
        />
        {duplicateCheckDone ? (
          <div style={{ color: '#409857' }}>{`*아이디 사용가능합니다`}</div>
        ) : duplicateCheckDisplay ? null : (
          <div style={{ color: '#409857' }}>{`*아이디가 중복됩니다`}</div>
        )}
        {signUpFaild ? null : mem_id ? null : (
          <div className={style.signupCheck}>{`*필수 정보입니다.`}</div>
        )}

        <button className={style.formButton}>중복체크</button>

        <br />

        <input
          name="mem_pw"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={mem_pw}
          onChange={onChangePassword}
        />
        {signUpFaild ? null : mem_pw ? null : (
          <div className={style.signupCheck}>{`*필수 정보입니다.`}</div>
        )}

        <input
          placeholder="비밀번호를 다시한번 입력해주세요"
          type="password"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
        />
        {signUpFaild ? null : passwordCheck ? null : (
          <div className={style.signupCheck}>{`*필수 정보입니다.`}</div>
        )}

        {passwordError ? (
          <div style={{ color: 'red' }}>*비밀번호가 일치하지 않습니다</div>
        ) : passwordCheck ? (
          <div style={{ color: '#409857' }}>{`*보안100%`}</div>
        ) : null}

        <br />

        <input
          name="mem_name"
          placeholder="이름을 입력해주세요"
          type="text"
          value={mem_name}
          onChange={onChangeName}
        />
        {signUpFaild ? null : mem_name ? null : (
          <div className={style.signupCheck}>{`*필수 정보입니다.`}</div>
        )}

        <input
          name="mem_nickname"
          placeholder="별명을 입력해주세요"
          type="text"
          value={mem_nickname}
          onChange={onChangeNickname}
        />
        {signUpFaild ? null : mem_nickname ? null : (
          <div className={style.signupCheck}>{`*필수 정보입니다.`}</div>
        )}

        <input
          name="mem_phone"
          placeholder="전화번호를 입력해주세요"
          type="number"
          maxLength="11"
          value={mem_phone}
          onChange={onChangePhone}
        />
        {signUpFaild ? null : mem_phone ? null : (
          <div className={style.signupCheck}>{`*필수 정보입니다.`}</div>
        )}
        <br />

        <div className={style.checkBox} onClick={checkboxClick}>
          <input
            name="mem_flag"
            type="checkbox"
            ref={checkInput}
            value={agree}
          />
          <label htmlFor="mem_flag">개인정보 활용 동의 (보기)</label>
          {signUpFaild ? null : agree ? null : (
            <div className={style.signupCheck}>{`*개인정보 동의 `}</div>
          )}
        </div>

        <button style={{ marginTop: 5 }} type="submit">
          가입하기
        </button>
      </form>
    </LoginLayout>
  );
};

export default Login;
