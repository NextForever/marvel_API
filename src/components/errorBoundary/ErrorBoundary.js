import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
// ловит ошибки в методе рендер , в методах жизненого цикла и конструкторах
// не ловят в оброботчиках событий , асинхронный код, и в самом предохранителе, (серверный рендеринг)

class ErrorBoundary extends Component {
    state = { error: false };

    componentDidCatch(err, errorInfo) {
        console.log(err, errorInfo);
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
