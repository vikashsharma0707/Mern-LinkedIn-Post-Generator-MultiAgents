import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Loader2, Copy, Check, RefreshCw } from 'lucide-react'
import api from '../services/api.js'
import toast from 'react-hot-toast'

const models = [
  { value: 'gemini', label: 'Google Gemini', icon: 'G' },
  { value: 'llama', label: 'Meta Llama', icon: 'L' },
  { value: 'qwen', label: 'Qwen', icon: 'Q' },
  { value: 'mistral', label: 'Mistral', icon: 'M' },
]

const HookGeneratorPage = () => {
  const [topic, setTopic] = useState('')
  const [industry, setIndustry] = useState('')
  const [count, setCount] = useState(5)
  const [model, setModel] = useState('gemini')
  const [hooks, setHooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!topic) {
      toast.error('Please enter a topic')
      return
    }
    setLoading(true)
    try {
      const response = await api.post('/hooks/generate', { topic, industry, count, model })
      if (response.data.success) {
        setHooks(response.data.data.hooks)
        toast.success(`${response.data.data.hooks.length} hooks generated!`)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate hooks')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (hook, index) => {
    navigator.clipboard.writeText(hook)
    setCopiedIndex(index)
    toast.success('Hook copied!')
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Hook Generator</h1>
        <p className="text-secondary-500 mt-1">Create scroll-stopping hooks that capture attention</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Topic *</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Why AI will replace most jobs"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g., Technology, Marketing"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Number of Hooks</label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(Math.min(15, Math.max(1, parseInt(e.target.value) || 1)))}
                min="1"
                max="15"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">AI Model</label>
              <div className="grid grid-cols-4 gap-2">
                {models.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setModel(m.value)}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      model === m.value ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-secondary-200 hover:border-secondary-300 text-secondary-600'
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
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              {loading ? 'Generating...' : 'Generate Hooks'}
            </button>
          </form>
        </div>

        <div>
          <AnimatePresence>
            {hooks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-secondary-900 flex items-center gap-2">
                    <Sparkles size={18} className="text-accent-600" />
                    Generated Hooks
                  </h3>
                  <button
                    onClick={() => handleSubmit({ preventDefault: () => {} })}
                    className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <RefreshCw size={14} />
                    Regenerate
                  </button>
                </div>
                <div className="space-y-3">
                  {hooks.map((hook, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-secondary-50 rounded-lg group hover:bg-primary-50 transition-colors"
                    >
                      <span className="text-sm font-bold text-primary-600 mt-0.5">{index + 1}.</span>
                      <p className="text-sm text-secondary-800 flex-1 leading-relaxed">{hook}</p>
                      <button
                        onClick={() => handleCopy(hook, index)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-white transition-all"
                        title="Copy hook"
                      >
                        {copiedIndex === index ? <Check size={14} className="text-success-600" /> : <Copy size={14} className="text-secondary-500" />}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default HookGeneratorPage
