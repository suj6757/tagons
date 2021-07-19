
const LoginKey = {
  rememberMe: 'remember_me',
  userInfo: 'user_info',
}

/// 로그인 정보 저장
export function login(userInfo, rememberMe) {
  let info = JSON.stringify(userInfo);
  if (rememberMe) {
    // Local Storage
    localStorage.setItem(LoginKey.userInfo, info);
  }
  else {
    // Session Storage
    sessionStorage.setItem(LoginKey.userInfo, info);
  }
}

/// 로그인 사용자 정보 가져오기
export function UserInfo() {
  let result = null;
  let ss = window.sessionStorage.getItem(LoginKey.userInfo);
  if (ss !== null) {
    result = JSON.parse(ss)[0];
  }
  else {
    let ls = window.localStorage.getItem(LoginKey.userInfo);
    if (ls !== null) {
      result = JSON.parse(ls)[0];
    }
  }
  return result;
}

/// 로그아웃, 로그인 정보 null 로.
export function logout() {
  /// 세션
  sessionStorage.clear();
  /// 로컬
  localStorage.clear();
}
