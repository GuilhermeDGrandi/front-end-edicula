import { call, put, takeLatest } from "redux-saga/effects";
import { loginSuccess, loginFailure } from "./actions";
import axios from '../../../services/axios';

function* login({ payload }) {
    try {
        const response = yield call(axios.post, '/auth', payload);

        // Axios já retorna os dados direto em response.data
        const data = response.data;

        const { token, user } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        yield put(loginSuccess(token, user));
    } catch (err) {
        // err.response?.data?.msg pode ter a mensagem do backend
        const errorMessage = err.response?.data?.msg || err.message || 'Erro no login';
        yield put(loginFailure(errorMessage));
    }
}

export default function* authSaga() {
    yield takeLatest('LOGIN_REQUEST', login);
}
