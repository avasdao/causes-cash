/* Import modules. */
import DOMPurify from 'dompurify'
import showdown from 'showdown'

/**
 * Cleaner
 *
 * Uses DOM Purify to sanitize HTML.
 * (source: https://github.com/cure53/DOMPurify)
 */
const cleaner = function (_html) {
    /* Return cleaned HTML. */
    return DOMPurify.sanitize(_html)
}

/**
 * Get Markdown
 *
 * Generates HTML from markdown and vice-versa.
 * (source: https://github.com/showdownjs/showdown)
 */
const getMarkdown = () => (_content) => {
    /* Initialize converter. */
    const converter = new showdown.Converter()

    /* Set converter to GitHub Flavored Markdown (GFM). */
    converter.setFlavor('github')

    /* Generate HTML content. */
    const html = converter.makeHtml(_content)
    // console.log('HTML', html)

    /* Clean HTML content. */
    const cleaned = cleaner(html)

    /* Format HTML. */
    // NOTE: Display fixes, probably related to our CSS.
    const formatted = cleaned
        .replace(/<ol>/gi, `<ol class="markdown-ul">`)
        .replace(/<ul>/gi, `<ul class="markdown-ul">`)
    console.log('FORMATTED', formatted)

    /* Return formatted content (for display). */
    return formatted
}

/* Export module. */
export default getMarkdown
