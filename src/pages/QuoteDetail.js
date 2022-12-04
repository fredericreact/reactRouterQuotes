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