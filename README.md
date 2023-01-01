Switch : permet d’avoir 1 active route at the same time only

## Setup React Router

```javascript
import {Route, Switch} from 'react-router-dom'
import AllQuotes from './pages/AllQuotes';
import QuotesDetail from './pages/QuoteDetail';
import NewQuote from './pages/NewQuote';
 
 
function App() {
  return (
    <Switch>
      <Route path='/quotes' exact>
      <AllQuotes/>
      </Route>
      <Route path='/quotes/:quoteId'>
      <QuotesDetail/>  
      </Route>
      <Route path='/new-quote'>
      <NewQuote/>  
      </Route>  
    </Switch>
  );
}
 
export default App;
 

```

```javascript
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
 
import './index.css';
import App from './App';
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter><App /></BrowserRouter>);
 

```

## Redirect

```javascript
import {Route, Switch, Redirect} from 'react-router-dom'
import AllQuotes from './pages/AllQuotes';
import QuotesDetail from './pages/QuoteDetail';
import NewQuote from './pages/NewQuote';
 
 
function App() {
  return (
    <Switch>
    <Route path='/' exact>
    <Redirect to='quotes'/>
    </Route>
      <Route path='/quotes' exact>
      <AllQuotes/>
      </Route>
      <Route path='/quotes/:quoteId'>
      <QuotesDetail/>  
      </Route>
      <Route path='/new-quote'>
      <NewQuote/>  
      </Route>  
    </Switch>
  );
}
 
export default App;
 

```

## Dynamic Route with Use Params

```javascript
import {useParams} from 'react-router-dom'
import {Fragment} from 'react'
 
const QuotesDetail = () => {
    const params = useParams()
    return <Fragment>
   
    <h1>QuoteDetails</h1>
    <p>{params.quoteId}</p>
</Fragment>
};
 
export default QuotesDetail;

```

## Nested Routes

```javascript
import {useParams, Route} from 'react-router-dom'
import {Fragment} from 'react'
import Comments from '../components/comments/Comments'
const QuotesDetail = () => {
    const params = useParams()
    return <Fragment>
   
    <h1>QuoteDetails</h1>
    <p>{params.quoteId}</p>
    <Route path={`/quotes/${params.quoteId}/comments`}>
    <Comments/>
    </Route>
</Fragment>
};
 
export default QuotesDetail;

```
## Add Layout Wrapper Component

```javascript
import { Fragment } from 'react';
import classes from './Layout.module.css'
import MainNavigation from './MainNavigation';
 
const Layout = (props) => {
return <Fragment>
<MainNavigation/>
    <main className={classes.main}>{props.children}</main>
</Fragment>
}
 
export default Layout;

```

```javascript
import {Route, Switch, Redirect} from 'react-router-dom'
import AllQuotes from './pages/AllQuotes';
import QuotesDetail from './pages/QuoteDetail';
import NewQuote from './pages/NewQuote';
import Layout from './components/layout/Layout';
 
function App() {
  return (
    <Layout>
    <Switch>
    <Route path='/' exact>
    <Redirect to='quotes'/>
    </Route>
      <Route path='/quotes' exact>
      <AllQuotes/>
      </Route>
      <Route path='/quotes/:quoteId'>
      <QuotesDetail/>  
      </Route>
      <Route path='/new-quote'>
      <NewQuote/>  
      </Route>  
    </Switch>
    </Layout>
  );
}
 
export default App;
 

```

## Create Dynamic Link to find a specific Quote

Create dynamic link

```javascript
import classes from './QuoteItem.module.css';
import {Link} from 'react-router-dom';
const QuoteItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link className='btn' to={`/quotes/${props.id}`}>
        View Fullscreen
      </Link>
    </li>
  );
};
 
export default QuoteItem;
 

```

Show the specific quote

```javascript
import {useParams, Route} from 'react-router-dom'
import {Fragment} from 'react'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote';
 
const DUMMY_QUOTES = [
    { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
    { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
  ];
 
const QuotesDetail = () => {
    const params = useParams()
 
    const quote = DUMMY_QUOTES.find(quote=>quote.id === params.quoteId)
 
    if (!quote) {
        return <p>No quote found!</p>
    }
 
    return <Fragment>
   
    <HighlightedQuote text = {quote.text} author ={quote.author} />
    <Route path={`/quotes/${params.quoteId}/comments`}>
    <Comments/>
    </Route>
</Fragment>
};
 
export default QuotesDetail;

```
## Add a not found page if the user enters an url not defined in the routes

```javascript
import {Route, Switch, Redirect} from 'react-router-dom'
import AllQuotes from './pages/AllQuotes';
import QuotesDetail from './pages/QuoteDetail';
import NewQuote from './pages/NewQuote';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';
 
function App() {
  return (
    <Layout>
    <Switch>
 
    <Route path='/' exact>
    <Redirect to='quotes'/>
    </Route>
 
      <Route path='/quotes' exact>
      <AllQuotes/>
      </Route>
 
      <Route path='/quotes/:quoteId'>
      <QuotesDetail/>  
      </Route>
     
      <Route path='/new-quote'>
      <NewQuote/>  
      </Route>  
 
      <Route path='*'>
      <NotFound/>
      </Route>
 
    </Switch>
    </Layout>
  );
}
 
export default App;
 

```

## Redirect to the quotes page after submitting a form

Use the useHistory hooks : it redirects to a new url and it changes the history of pages we visited

So we change the history of pages visited by adding a new page : history.push 
history.push will push a new page on our history of pages, and with that if we click on previous button, we can go back to previous page which is the form. 

If you use history.replace , we cannot, it will replace the current page, its like a redirect. 

history.push adds a new page.

It just about if you want to allow your user to go back to the form or not.


```javascript
import {useHistory} from 'react-router-dom'
import QuoteForm from '../components/quotes/QuoteForm'
 
const NewQuote = () => {
    const history = useHistory();
    const addQuoteHandler = quoteData => {
        console.log(quoteData);
        history.push('/quotes')
 
    }
    return <QuoteForm onAddQuote={addQuoteHandler}/>
};
 
export default NewQuote;

```
## Prevent Route redirection with “Prompt” Component

Prompt component will show a message if we try to navigate away or change url

```javascript
import { useRef , useState, Fragment} from 'react';
import {Prompt} from 'react-router-dom'
 
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';
 
const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
 
  const authorInputRef = useRef();
  const textInputRef = useRef();
 
  function submitFormHandler(event) {
    event.preventDefault();
 
    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;
 
    // optional: Could validate here
 
    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }
 
  const finishEnteringHandler = () => {
    setIsEntering(false)
  }
 
  const formFocusHandler = () => {
    setIsEntering(true)
  }
 
  return (
    <Fragment>
    <Prompt when={isEntering}
    message={(location) =>
    'Are you sure you want to leave?'}/>
    <Card>
      <form onFocus={formFocusHandler} className={classes.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}
 
        <div className={classes.control}>
          <label htmlFor='author'>Author</label>
          <input type='text' id='author' ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='text'>Text</label>
          <textarea id='text' rows='5' ref={textInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button onClick={finishEnteringHandler} className='btn'>Add Quote</button>
        </div>
      </form>
    </Card>
    </Fragment>
  );
};
 
export default QuoteForm;
 

```

## Query Parameter

Query parameters are parameters at the end of url, after a questions mark. 
It passes extra data in the page. 
They are not mandatory unlike regular route parameters, they are optional

useLocation hooks has information about the current page / current url

Below is a sorting function using query parameters in the url

```javascript
import { Fragment } from 'react';
import {useHistory, useLocation} from 'react-router-dom'
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
 
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};
 
const QuoteList = (props) => {
 
  const history = useHistory();
  const location = useLocation();
 
  const queryParams = new URLSearchParams(location.search);
 
  const isSortingAscending = queryParams.get('sort') === 'asc';
 
  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending)
 
  const changeSortingHandler =() => {
    history.push('/quotes?sort=' + (isSortingAscending ? 'desc' : 'asc'))
 
  }
 
  return (
    <Fragment>
    <div className={classes.sorting}>
      <button onClick={changeSortingHandler}>
      Sort {isSortingAscending ? 'Descending':'Ascending'}
      </button>
    </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};
 
export default QuoteList;
 

```
## Write dynamic routes (not string)

You can do that for nested routes, which can find their parent route using hooks : useLocation or useRouteMatch

```javascript
import {useParams, Route, Link, useRouteMatch} from 'react-router-dom'
import {Fragment} from 'react'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote';
 
const DUMMY_QUOTES = [
    { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
    { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
  ];
 
const QuotesDetail = () => {
    const match = useRouteMatch();
    const params = useParams()
 
    console.log(match)
    const quote = DUMMY_QUOTES.find(quote=>quote.id === params.quoteId)
 
    if (!quote) {
        return <p>No quote found!</p>
    }
 
    return <Fragment>
   
    <HighlightedQuote text = {quote.text} author ={quote.author} />
 
    <Route path={match.path} exact>
    <div className='centered'>
        <Link className='btn--flat' to={`${match.url}/comments`}>
            Load Comments
        </Link>
    </div>
    </Route>
 
   
    <Route path={`${match.path}/comments`}>
    <Comments/>
    </Route>
</Fragment>
};
 
export default QuotesDetail;

```

```javascript
import { Fragment } from 'react';
import {useHistory, useLocation} from 'react-router-dom'
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
 
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};
 
const QuoteList = (props) => {
 
  const history = useHistory();
  const location = useLocation();
 
  const queryParams = new URLSearchParams(location.search);
 
  const isSortingAscending = queryParams.get('sort') === 'asc';
 
  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending)
 
  const changeSortingHandler =() => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`
    })
  }
 
  return (
    <Fragment>
    <div className={classes.sorting}>
      <button onClick={changeSortingHandler}>
      Sort {isSortingAscending ? 'Descending':'Ascending'}
      </button>
    </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};
 
export default QuoteList;
 

```

## Posting and getting Quote on Firebase using custom hooks

POST quote

```javascript
import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import QuoteForm from '../components/quotes/QuoteForm'
import useHttp from '../hooks/use-http'
import {addQuote} from '../lib/api'
 
 
const NewQuote = () => {
    const {sendRequest, status} = useHttp(addQuote);
    const history = useHistory();
 
    useEffect(()=>{
        if(status === 'completed'){history.push('/quotes')
    }
    },[status, history])
 
    const addQuoteHandler = quoteData => {
        sendRequest(quoteData);
 
    }
    return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>
};
 
export default NewQuote;

```
GET Quote List

```javascript
import QuoteList from '../components/quotes/QuoteList'
import useHttp from '../hooks/use-http';
import {getAllQuotes} from '../lib/api'
import { useEffect } from 'react';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound'
 
const AllQuotes = () => {
  const {sendRequest, status, data: loadedQuotes, error} = useHttp(
    getAllQuotes,
    true
  );
 
  useEffect(()=>{
    sendRequest();
  }, [sendRequest])
 
  if (status === 'pending'){
    return (
      <div className='centered'>
        <LoadingSpinner/>
      </div>
    )
  }
 
  if (error) {
    return <p className='centered focused'>{error}</p>
  }
 
  if (status === 'completed' && (!loadedQuotes || loadedQuotes.length ===0)) {
    return <NoQuotesFound/>
  }
 
return <QuoteList quotes={loadedQuotes}/>
};
 
export default AllQuotes;

```

Get single quote detail

```javascript
import {useParams, Route, Link, useRouteMatch} from 'react-router-dom'
import {Fragment, useEffect} from 'react'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
 
const QuotesDetail = () => {
    const match = useRouteMatch();
    const params = useParams()
 
    const {quoteId} = params
 
    const {sendRequest, status, data: loadedQuote, error}=useHttp(getSingleQuote, true);
 
    useEffect(()=> {
        sendRequest(quoteId);
    }, [sendRequest,quoteId])
 
 
    if (status ==='pending') {
        return (
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        )
    }
 
    if (error) {
        return <p className='centered'>{error}</p>
    }
 
    if (!loadedQuote.text) {
        return <p>No quote found!</p>
    }
 
    return <Fragment>
   
    <HighlightedQuote text = {loadedQuote.text} author ={loadedQuote.author} />
 
    <Route path={match.path} exact>
    <div className='centered'>
        <Link className='btn--flat' to={`${match.url}/comments`}>
            Load Comments
        </Link>
    </div>
    </Route>
 
   
    <Route path={`${match.path}/comments`}>
    <Comments/>
    </Route>
</Fragment>
};
 
export default QuotesDetail;

```

## Posting and getting Comments on Firebase using custom hooks



```javascript
import { useRef, useEffect } from 'react';
import useHttp from '../../hooks/use-http'
import {addComment} from '../../lib/api'
import classes from './NewCommentForm.module.css';
import LoadingSpinner from '../../components/UI/LoadingSpinner'
 
const NewCommentForm = (props) => {
  const commentTextRef = useRef();
 
  const {sendRequest, status,error} = useHttp(addComment);
 
  const {onAddedComment} = props
 
  useEffect(()=>{
    if(status === 'completed'){
      onAddedComment();
    }
  },[status,error, onAddedComment])
 
  const submitFormHandler = (event) => {
    event.preventDefault();
 
    const enteredText = commentTextRef.current.value
 
    // optional: Could validate here
 
    sendRequest({commentData:{text: enteredText}, quoteId:props.quoteId});
  };
 
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
    {status === 'pending' && (
      <div className='centered'>
        <LoadingSpinner/>
      </div>
    )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};
 
export default NewCommentForm;
 

```

```javascript
import { useState, useEffect, useCallback } from 'react';
import {useParams} from 'react-router-dom'
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import {getAllComments} from '../../lib/api'
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList'
 
const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const {quoteId} = params
  const {sendRequest, status, data: loadedComments}=useHttp(getAllComments);
 
  useEffect(()=>{
    sendRequest(quoteId)
  },[quoteId, sendRequest])
 
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
 
  const addedCommentHandler = useCallback(() => {
   sendRequest(quoteId);
  }, [sendRequest,quoteId])
 
  let comments;
 
  if (status === 'pending') {
      comments = (
        <div className='centered'>
          <LoadingSpinner/>
        </div>
      )
  }
 
  if (status==='completed' && (loadedComments && loadedComments.length >0)){
    comments = <CommentsList comments={loadedComments}/>
  }
 
  if (
    status === 'completed' && (!loadedComments || loadedComments.length===0)
  ) {
    comments = <p className='centered'>No comments were added yet</p>
  }
 
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addedCommentHandler}/>}
      {comments}
    </section>
  );
};
 
export default Comments;
 

```


# Deploy React Apps

## Lazy Loading : Load code only when it’s needed

<br/>

1. Remove the import 

```javascript
import NewQuote from './pages/NewQuote';
```

2. Add New Quote

```javascript
const NewQuote = React.lazy(()=> import('./pages/NewQuote'));
```

3. Use <Suspense> to have a callback in case there the component is not loaded yet

```javascript
import React, {Suspense} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import AllQuotes from './pages/AllQuotes';
import QuotesDetail from './pages/QuoteDetail';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';
import LoadingSpinner from './components/UI/LoadingSpinner';
 
const NewQuote = React.lazy(()=> import('./pages/NewQuote'));
 
function App() {
  return (
    <Layout>
    <Suspense
    fallback={
      <div className='centered'>
        <LoadingSpinner/>
      </div>
    }>
    <Switch>
 
    <Route path='/' exact>
    <Redirect to='quotes'/>
    </Route>
 
      <Route path='/quotes' exact>
      <AllQuotes/>
      </Route>
 
      <Route path='/quotes/:quoteId'>
      <QuotesDetail/>  
      </Route>
     
      <Route path='/new-quote'>
      <NewQuote/>  
      </Route>  
 
      <Route path='*'>
      <NotFound/>
      </Route>
 
    </Switch>
    </Suspense>
    </Layout>
  );
}
 
export default App;
 

```

## Deployment

<br>

```javascript
npm run build
```

1. Firebase :  Hosting

2. firebase login > firebase init > Hosting > build > firebase deploy

<br>

>If you want to take down your website : firebase hosting:disable > go to firebase platform to delete

<br>

## Single Page application : 

Le server va ignorer le path , il va charger tous les files html css js 1 fois.

Then les changement de path seront fait par react.

A l’inverse, en general pour chaque path, le serveur va envoyer une nouvelle page

Exemple : www.google.fr/path
