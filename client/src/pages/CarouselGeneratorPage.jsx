import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Loader2, Copy, Check, ChevronRight } from 'lucide-react'
import api from '../services/api.js'
import toast from 'react-hot-toast'

const models = [
  { value: 'gemini', label: 'Google Gemini', icon: 'G' },
  { value: 'llama', label: 'Meta Llama', icon: 'L' },
  { value: 'qwen', label: 'Qwen', icon: 'Q' },
  { value: 'mistral', label: 'Mistral', icon: 'M' },
]

const tones = ['professional', 'technical', 'casual', 'storytelling', 'motivational', 'founder style']

const CarouselGeneratorPage = () => {
  const [formData, setFormData] = useState({
    topic: '',
    industry: '',
    audience: '',
    tone: 'professional',
    slideCount: 5,
    model: 'gemini'
  })
  const [slides, setSlides] = useState([])
  const [rawContent, setRawContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.topic) {
      toast.error('Please enter a topic')
      return
    }
    setLoading(true)
    try {
      const response = await api.post('/carousel/generate', formData)
      if (response.data.success) {
        setSlides(response.data.data.slides)
        setRawContent(response.data.data.rawContent)
        setActiveSlide(0)
        toast.success(`Carousel with ${response.data.data.slideCount} slides generated!`)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate carousel')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    toast.success('Slide copied!')
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Carousel Generator</h1>
        <p className="text-secondary-500 mt-1">Generate multi-slide carousel content for LinkedIn</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Topic *</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="e.g., 5 AI Tools Every Developer Should Know"
                className="input-field"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Industry</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="e.g., Technology"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Audience</label>
                <input
                  type="text"
                  value={formData.audience}
                  onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                  placeholder="e.g., Developers"
                  className="input-field"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Tone</label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  className="select-field"
                >
                  {tones.map(tone => (
                    <option key={tone} value={tone}>{tone.charAt(0).toUpperCase() + tone.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Slide Count</label>
                <input
                  type="number"
                  value={formData.slideCount}
                  onChange={(e) => setFormData({ ...formData, slideCount: Math.min(10, Math.max(3, parseInt(e.target.value) || 3)) })}
                  min="3"
                  max="10"
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">AI Model</label>
              <div className="grid grid-cols-4 gap-2">
                {models.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, model: m.value })}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      formData.model === m.value ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-secondary-200 hover:border-secondary-300 text-secondary-600'
                    }`}
                  >
                    <div className="text-lg font-bold mb-1">{m.icon}</div>
                    <div className="text-xs font-medium">{m.label}</div>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Layers size={18} />}
              {loading ? 'Generating...' : 'Generate Carousel'}
            </button>
          </form>
        </div>

        <div>
          <AnimatePresence>
            {slides.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-secondary-900 flex items-center gap-2">
                      <Layers size={18} className="text-primary-600" />
                      Carousel Preview
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-secondary-500">Slide {activeSlide + 1} of {slides.length}</span>
                    </div>
                  </div>

                  <div className="bg-secondary-900 rounded-xl p-6 mb-4 min-h-[200px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSlide}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-accent-400 text-sm font-semibold mb-2">SLIDE {slides[activeSlide].number}</div>
                        <h4 className="text-white text-xl font-bold mb-3">{slides[activeSlide].title}</h4>
                        <p className="text-secondary-300 text-sm leading-relaxed whitespace-pre-wrap">{slides[activeSlide].content}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`flex-1 h-2 rounded-full transition-all ${
                          index === activeSlide ? 'bg-primary-500' : 'bg-secondary-200'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
                      disabled={activeSlide === 0}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-secondary-600 hover:bg-secondary-100 disabled:opacity-50 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handleCopy(`Slide ${slides[activeSlide].number}: ${slides[activeSlide].title}\n${slides[activeSlide].content}`, activeSlide)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      {copiedIndex === activeSlide ? <Check size={14} /> : <Copy size={14} />}
                      {copiedIndex === activeSlide ? 'Copied' : 'Copy Slide'}
                    </button>
                    <button
                      onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))}
                      disabled={activeSlide === slides.length - 1}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-secondary-600 hover:bg-secondary-100 disabled:opacity-50 transition-colors flex items-center gap-1"
                    >
                      Next
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <div className="card">
                  <h3 className="font-semibold text-secondary-900 mb-3 text-sm">All Slides</h3>
                  <div className="space-y-3">
                    {slides.map((slide, index) => (
                      <div
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          index === activeSlide ? 'bg-primary-50 border border-primary-200' : 'bg-secondary-50 hover:bg-secondary-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${index === activeSlide ? 'text-primary-600' : 'text-secondary-400'}`}>SLIDE {slide.number}</span>
                          <span className="text-sm font-medium text-secondary-900">{slide.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default CarouselGeneratorPage
