import React from 'react'
import Link from './Link';

const LastShelfItem = () => (
    <div className="shelf-item last-shelf-item">
        <h5>Stay tuned for more to come!</h5>
        <span><Link>RSS</Link> | <Link>GitHub</Link> | <Link>Twitter</Link></span>
    </div>
)
 
export default LastShelfItem