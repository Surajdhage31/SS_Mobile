import { Link } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition.jsx';

export default function NotFound() {
  return (
    <PageTransition>
      <section className="mx-4 mt-16 flex flex-col items-center gap-4 text-center sm:mx-6">
        <h1 className="text-4xl font-extrabold text-ink">404</h1>
        <p className="text-muted">We couldn't find the page you're looking for.</p>
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
      </section>
    </PageTransition>
  );
}
