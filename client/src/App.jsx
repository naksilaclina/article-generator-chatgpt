import { useState } from "react"

function App() {

  const [loading, setLoading] = useState(false)
  const [article, setArticle] = useState([])
  const [formData, setFormData] = useState({
    topic: '',
    keywords: '',
    lang: 'Turkish',
    wordCount: '500'
  })

  const apiUrl = window.location.href

  const submitHandle = e => {
    e.preventDefault()
    setLoading(true)
    fetch(`${apiUrl}create-article`, {
      method: 'post',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(res => {
      if (res?.error) {

      } else {
        console.log(res)
        console.log(res.content)
        setArticle(res.content.replaceAll("\n", "<br/>"))
      }
    })
    .catch(error => console.error(error))
    .finally(() => {
      setLoading(false)
    })
  }

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const isDisabled = Object.values(formData).some(value => !value) || loading

  return (
    <div className="max-w-[800px] mx-auto p-5">
      <h1 className="py-3 flex text-center items-center text-4xl font-extrabold dark:text-black pb-5">Makale Oluşturucu</h1>

      <form onSubmit={submitHandle} className="mb-3">
        <div className="py-1">
          <label>Makale Başlığı
            <input 
              type="text"
              name="topic" 
              value={formData.topic}
              onChange={handleInputChange}
              placeholder="2023 yılının en iyi meyveleri hangileridir?"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </label>
        </div>

        <div className="pb-5 pt-1">
          <label>Anahtar Kelimeler
            <input 
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              placeholder="Elma, Armut, Kivi"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </label>
        </div>

        <div className="py-1">
          <label>Makale Dili
            <select 
              name="lang"
              value={formData.lang}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Turkish">Türkçe</option>
              <option value="English">İngilizce</option>
            </select>
          </label>
        </div>

        <div className="pb-5 pt-1">
          <label>Makale Uzunluğu
            <select 
              name="wordCount"
              value={formData.wordCount}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="250">250</option>
              <option value="500">500</option>
              <option value="750">750</option>
              <option value="1000">1000</option>
            </select>
          </label>
        </div>
        <button
          disabled={isDisabled}
          type="submit" 
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? '...' : 'Makale Oluştur'}
        </button>
      </form>

      
      {article.length > 0 && (
        <div className="mb-10">
          <section className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <header className="text-lg text-gray-500 border-b mb-3 pb-3">
                <div>
                  Makale Çıktısı
                </div>
              </header>
            <div dangerouslySetInnerHTML={{ __html: article }}></div>
          </section> 
        </div>
      )}
    </div>
  )
}

export default App
