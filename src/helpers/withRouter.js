import { useLocation, useNavigate, useParams } from 'react-router';

export default function withRouter(Component) {
  return function RouterComponent(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return (
      <Component
        {...props}
        location={location}
        navigate={navigate}
        match={{ params }}
        history={{
          goBack: () => navigate(-1),
          push: (path) => navigate(path),
          replace: (path) => navigate(path, { replace: true }),
        }}
      />
    );
  };
}