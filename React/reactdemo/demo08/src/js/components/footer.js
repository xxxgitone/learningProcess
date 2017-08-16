import React from 'react'
import footerCss from '../../css/footer.css'

class ComponentFooter extends React.Component {
  render () {
    return (
      <footer class={footerCss.miniFooter}>
        <h2>这里是页脚</h2>
      </footer>
    )
  }
}

export default ComponentFooter
