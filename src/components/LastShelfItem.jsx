import React from 'react'
import Link from './Link';

const LastShelfItem = () => (
    <div className="shelf-item last-shelf-item">
        <h5>Stay tuned for more to come!</h5>
        <span><Link>RSS</Link> | <Link to="https://github.com/t0astbread">GitHub</Link> | <Link to="https://twitter.com/t0astbread">Twitter</Link></span>
    </div>
)
 
export default LastShelfItem