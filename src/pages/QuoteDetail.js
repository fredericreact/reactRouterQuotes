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