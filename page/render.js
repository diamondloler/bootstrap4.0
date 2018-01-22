
define('page/render', [], function () {
    var m_ele = document.querySelector('*[data-module]') || 0,
    m_id = m_ele.getAttribute('data-module');
    m_id && require([m_id]);
})
