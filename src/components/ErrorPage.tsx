import { FunctionComponent } from "react";
import "../styles/ErrorPage.css"
interface ErrorPageProps {}

const ErrorPage: FunctionComponent<ErrorPageProps> = () => {
  return (
    <div className="errorPage">
      <h1>There was an issue reaching the server.</h1>
      <p>Try again later or please contact mail@lucashopman.nl if this issue reoccurs.</p>
    </div>
  );
};

export default ErrorPage;
