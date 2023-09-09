import * as React from "react"
import {Link, HeadFC, PageProps} from "gatsby"


const NotFoundPage: React.FC<PageProps> = () => (<main><Link to='/'>Oopsie Doopsie</Link></main>);

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
