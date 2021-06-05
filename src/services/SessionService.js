var _sessionData = {};

function _getItem(key) {
  if (!_sessionData[key]) {
    _sessionData[key] =
      window.sessionStorage.getItem(key) || window.localStorage.getItem(key);
  }

  return _sessionData[key];
}

function _setItem(key, val, storage) {
  _sessionData[key] = val;

  if (storage === 'session') {
    window.sessionStorage.setItem(key, val);
  } else {
    window.localStorage.setItem(key, val);
  }

  return _sessionData[key];
}

function _removeItem(key, storage) {
  delete _sessionData[key];

  if (storage === 'session') {
    window.sessionStorage.removeItem(key);
  } else {
    window.localStorage.removeItem(key);
  }
}

function _clear() {
  var i;

  _sessionData = {};

  for (i in window.localStorage) {
    if (i.indexOf('__') !== 0) {
      _removeItem(i);
    }
  }

  window.sessionStorage.clear();
}

function _clearAll() {
  _sessionData = {};
  window.localStorage.clear();
}

export default {
  clear: _clear,
  clearAll: _clearAll,
  getItem: _getItem,
  setItem: _setItem,
  removeItem: _removeItem,
};
