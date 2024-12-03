import { useEffect } from 'react';

export default function DataVisualizations() {
    useEffect(() => {
        const divElement = document.getElementById('viz1731912329724');
        if (!divElement) return; 

        const vizElement = divElement.getElementsByTagName('object')[0];
        if (!vizElement) return;

        if (divElement.offsetWidth > 800) {
            vizElement.style.width = '100%';
            vizElement.style.height = '827px';
        } else if (divElement.offsetWidth > 500) {
            vizElement.style.width = '100%';
            vizElement.style.height = '827px';
        } else {
            vizElement.style.width = '100%';
            vizElement.style.height = '1177px';
        }

        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
        vizElement.parentNode.insertBefore(scriptElement, vizElement);

    }, []); 

    return (
        <div className="bg-white p-6 rounded-lg shadow ring-1 ring-gray-300">
            <div className="tableauPlaceholder" id="viz1731912329724" style={{
                position: 'relative', }} >
                <noscript>
                    <a href="#">
                        <img
                            alt="Dashboard 1"
                            src="https://public.tableau.com/static/images/4Q/4QD3YTFDY/1_rss.png"
                            style={{ border: 'none' }}
                        />
                    </a>
                </noscript>
                <object className="tableauViz" style={{ display: 'none' }}>
                    <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
                    <param name="embed_code_version" value="3" />
                    <param name="path" value="shared/4QD3YTFDY" />
                    <param name="toolbar" value="yes" />
                    <param name="static_image" value="https://public.tableau.com/static/images/4Q/4QD3YTFDY/1.png" />
                    <param name="animate_transition" value="yes" />
                    <param name="display_static_image" value="yes" />
                    <param name="display_spinner" value="yes" />
                    <param name="display_overlay" value="yes" />
                    <param name="display_count" value="yes" />
                    <param name="language" value="en-US" />
                    <param name="filter" value="publish=yes" />
                </object>
            </div>
        </div>
    );
}

