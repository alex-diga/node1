import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const Router = ({ routes }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationPath = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', onLocationPath)
    return () => window.removeEventListener('popstate', onLocationPath)
  }, [])

  return routes?.find(({ path }) => path === currentPath)?.component
}

const navigate = (path) => {
  window.history.pushState({}, '', path)
  const navEvent = new PopStateEvent('popstate');
  window.dispatchEvent(navEvent)
}

const Link = ({ path, children, className }) => {
  const onClick = (event) => {
    if (event.mateKey || event.ctrlkey) {
      return
    }
    event.preventDefault()
    navigate(path)
  }
  return <a href={path} className={className} onClick={onClick}>{children}</a>
}

const Articles = () => {
  return (
    <div>
      <Link path="/">go back home</Link>
      <h2>Articles page</h2>
      <div>
        <span onClick={() => navigate('detail')}>to detail</span>
      </div>
    </div>
  )
}

const Detail = () => {
  return (
    <div>
      <Link path="/">go back home</Link>
      <h2>Detail page</h2>
      <div>
        <span onClick={() => navigate('articles')}>to detail</span>
      </div>
    </div>
  )
}

const Home = () => {
  return (
    <div>
      <h2>Home page</h2>
      <div>
        <Link path="/articles">articles page</Link>
        <Link path="/detail">detail page</Link>
      </div>
    </div>
  )
}

const App = () => {
  const routes = [
    { path: '/', component: Home },
    { path: '/articles', component: Articles },
    { path: '/detail', component: Detail }
  ]
  return (
    <div>
      <h1>React Router App</h1>
      <Router routes={routes} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)