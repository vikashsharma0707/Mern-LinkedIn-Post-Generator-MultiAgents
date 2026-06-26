// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Hash, Loader2, Copy, Check, RefreshCw } from 'lucide-react'
// import api from '../services/api.js'
// import toast from 'react-hot-toast'

// const models = [
//   { value: 'gemini', label: 'Google Gemini', icon: 'G' },
//   { value: 'llama', label: 'Meta Llama', icon: 'L' },
//   { value: 'qwen', label: 'Qwen', icon: 'Q' },
//   { value: 'mistral', label: 'Mistral', icon: 'M' },
// ]

// const HashtagGeneratorPage = () => {
//   const [topic, setTopic] = useState('')
//   const [industry, setIndustry] = useState('')
//   const [count, setCount] = useState(15)
//   const [model, setModel] = useState('gemini')
//   const [hashtags, setHashtags] = useState([])
//   const [hashtagString, setHashtagString] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [copied, setCopied] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!topic) {
//       toast.error('Please enter a topic')
//       return
//     }
//     setLoading(true)
//     try {
//       const response = await api.post('/hashtags/generate', { topic, industry, count, model })
//       if (response.data.success) {
//         setHashtags(response.data.data.hashtags)
//         setHashtagString(response.data.data.hashtagString)
//         toast.success(`${response.data.data.hashtags.length} hashtags generated!`)
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to generate hashtags')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text)
//     setCopied(true)
//     toast.success('Hashtags copied!')
//     setTimeout(() => setCopied(false), 2000)
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-secondary-900">Hashtag Generator</h1>
//         <p className="text-secondary-500 mt-1">Generate optimized hashtags for maximum reach</p>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-6">
//         <div className="card">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-secondary-700 mb-2">Topic *</label>
//               <input
//                 type="text"
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 placeholder="e.g., Artificial Intelligence"
//                 className="input-field"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-secondary-700 mb-2">Industry</label>
//               <input
//                 type="text"
//                 value={industry}
//                 onChange={(e) => setIndustry(e.target.value)}
//                 placeholder="e.g., Technology, Marketing"
//                 className="input-field"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-secondary-700 mb-2">Number of Hashtags</label>
//               <input
//                 type="number"
//                 value={count}
//                 onChange={(e) => setCount(Math.min(20, Math.max(5, parseInt(e.target.value) || 5)))}
//                 min="5"
//                 max="20"
//                 className="input-field"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-secondary-700 mb-2">AI Model</label>
//               <div className="grid grid-cols-4 gap-2">
//                 {models.map((m) => (
//                   <button
//                     key={m.value}
//                     type="button"
//                     onClick={() => setModel(m.value)}
//                     className={`p-3 rounded-lg border text-center transition-all ${
//                       model === m.value ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-secondary-200 hover:border-secondary-300 text-secondary-600'
//                     }`}
//                   >
//                     <div className="text-lg font-bold mb-1">{m.icon}</div>
//                     <div className="text-xs font-medium">{m.label}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
//             >
//               {loading ? <Loader2 size={18} className="animate-spin" /> : <Hash size={18} />}
//               {loading ? 'Generating...' : 'Generate Hashtags'}
//             </button>
//           </form>
//         </div>

//         <div>
//           <AnimatePresence>
//             {hashtags.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="card"
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="font-semibold text-secondary-900 flex items-center gap-2">
//                     <Hash size={18} className="text-success-600" />
//                     Generated Hashtags
//                   </h3>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => handleCopy(hashtagString)}
//                       className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
//                     >
//                       {copied ? <Check size={14} /> : <Copy size={14} />}
//                       {copied ? 'Copied' : 'Copy All'}
//                     </button>
//                     <button
//                       onClick={() => handleSubmit({ preventDefault: () => {} })}
//                       className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
//                     >
//                       <RefreshCw size={14} />
//                       Regenerate
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {hashtags.map((tag, index) => (
//                     <motion.span
//                       key={index}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: index * 0.05 }}
//                       className="px-3 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium border border-primary-100 cursor-pointer hover:bg-primary-100 transition-colors"
//                       onClick={() => handleCopy(`#${tag}`)}
//                     >
//                       #{tag}
//                     </motion.span>
//                   ))}
//                 </div>

//                 <div className="bg-secondary-50 rounded-lg p-4">
//                   <div className="text-xs text-secondary-500 mb-2 font-medium">Full String</div>
//                   <p className="text-sm text-secondary-700 leading-relaxed">{hashtagString}</p>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default HashtagGeneratorPage




import { useState, useCallback, useReducer } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hash, Loader2, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react'
import api from '../services/api.js'
import toast from 'react-hot-toast'

// ============================================================================
// Constants
// ============================================================================

const MODELS = [
  { value: 'gemini', label: 'Google Gemini', icon: 'G' },
  { value: 'llama', label: 'Meta Llama', icon: 'L' },
  { value: 'qwen', label: 'Qwen', icon: 'Q' },
  { value: 'mistral', label: 'Mistral', icon: 'M' },
]

const MIN_HASHTAGS = 5
const MAX_HASHTAGS = 20
const TOPIC_MAX_LENGTH = 100
const COPY_FEEDBACK_DURATION = 2000

// ============================================================================
// Form State Reducer
// ============================================================================

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOPIC':
      return { ...state, topic: action.payload.slice(0, TOPIC_MAX_LENGTH) }
    case 'SET_INDUSTRY':
      return { ...state, industry: action.payload }
    case 'SET_COUNT':
      return {
        ...state,
        count: Math.min(MAX_HASHTAGS, Math.max(MIN_HASHTAGS, parseInt(action.payload) || MIN_HASHTAGS)),
      }
    case 'SET_MODEL':
      return { ...state, model: action.payload }
    case 'RESET':
      return { topic: '', industry: '', count: 15, model: 'gemini' }
    default:
      return state
  }
}

// ============================================================================
// Sub-components
// ============================================================================

const FormInput = ({ label, required, error, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-secondary-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      {...props}
      className={`input-field ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
      aria-invalid={!!error}
      aria-describedby={error ? `${props.name}-error` : undefined}
    />
    {error && (
      <p id={`${props.name}-error`} className="text-xs text-red-500 mt-1">
        {error}
      </p>
    )}
  </div>
)

const ModelSelector = ({ models, selectedModel, onModelChange, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-secondary-700 mb-2">AI Model</label>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {models.map((m) => (
        <button
          key={m.value}
          type="button"
          onClick={() => onModelChange(m.value)}
          disabled={disabled}
          className={`p-3 rounded-lg border text-center transition-all ${
            selectedModel === m.value
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-secondary-200 hover:border-secondary-300 text-secondary-600 disabled:opacity-50'
          }`}
          aria-pressed={selectedModel === m.value}
          aria-label={m.label}
        >
          <div className="text-lg font-bold mb-1">{m.icon}</div>
          <div className="text-xs font-medium">{m.label}</div>
        </button>
      ))}
    </div>
  </div>
)

const HashtagsDisplay = ({ hashtags, hashtagString, loading, onCopy, onRegenerate }) => (
  <AnimatePresence>
    {hashtags.length > 0 && (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-4 border-b border-secondary-200">
          <h3 className="font-semibold text-secondary-900 flex items-center gap-2">
            <Hash size={18} className="text-success-600" />
            Generated Hashtags ({hashtags.length})
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onCopy(hashtagString)}
              className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium px-2 py-1 rounded transition-colors hover:bg-primary-50"
              disabled={loading}
              aria-label="Copy all hashtags"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Copy size={14} />}
              <span className="hidden sm:inline">Copy All</span>
            </button>
            <button
              onClick={onRegenerate}
              disabled={loading}
              className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium px-2 py-1 rounded transition-colors hover:bg-primary-50 disabled:opacity-50"
              aria-label="Regenerate hashtags"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Regenerate</span>
            </button>
          </div>
        </div>

        {/* Hashtag Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hashtags.map((tag, index) => (
            <motion.button
              key={`${tag}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onCopy(`#${tag}`)}
              className="px-3 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium border border-primary-100 hover:bg-primary-100 hover:border-primary-200 transition-colors cursor-pointer"
              title={`Click to copy #${tag}`}
              type="button"
            >
              #{tag}
            </motion.button>
          ))}
        </div>

        {/* Full String */}
        <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
          <div className="text-xs text-secondary-500 mb-2 font-medium uppercase tracking-wide">
            Full String
          </div>
          <p className="text-sm text-secondary-700 leading-relaxed break-words font-mono">
            {hashtagString}
          </p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)

const ErrorAlert = ({ error, onDismiss }) => (
  <AnimatePresence>
    {error && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
      >
        <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-red-900">{error}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-red-600 hover:text-red-700 flex-shrink-0"
          aria-label="Dismiss error"
        >
          ✕
        </button>
      </motion.div>
    )}
  </AnimatePresence>
)

// ============================================================================
// Main Component
// ============================================================================

const HashtagGeneratorPage = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    topic: '',
    industry: '',
    count: 15,
    model: 'gemini',
  })

  const [hashtags, setHashtags] = useState([])
  const [hashtagString, setHashtagString] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const validateInputs = useCallback(() => {
    if (!formState.topic.trim()) {
      setError('Please enter a topic')
      return false
    }
    if (formState.topic.trim().length < 2) {
      setError('Topic must be at least 2 characters')
      return false
    }
    setError('')
    return true
  }, [formState.topic])

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault?.()

      if (!validateInputs()) return

      setLoading(true)
      setError('')

      try {
        const response = await api.post('/hashtags/generate', {
          topic: formState.topic.trim(),
          industry: formState.industry.trim(),
          count: formState.count,
          model: formState.model,
        })

        if (response.data?.success && response.data?.data) {
          setHashtags(response.data.data.hashtags || [])
          setHashtagString(response.data.data.hashtagString || '')
          toast.success(`✨ ${response.data.data.hashtags?.length || 0} hashtags generated!`)
        } else {
          throw new Error(response.data?.message || 'Failed to generate hashtags')
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || 'Failed to generate hashtags'
        setError(errorMessage)
        toast.error(errorMessage)
        console.error('Hashtag generation error:', error)
      } finally {
        setLoading(false)
      }
    },
    [formState, validateInputs]
  )

  const handleCopy = useCallback((text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        toast.success('Copied to clipboard!')
        setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION)
      })
      .catch(() => {
        toast.error('Failed to copy')
      })
  }, [])

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' })
    setHashtags([])
    setHashtagString('')
    setError('')
    setLoading(false)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Hashtag Generator</h1>
        <p className="text-secondary-500 mt-1">
          Generate optimized hashtags for maximum reach across social platforms
        </p>
      </div>

      {/* Error Alert */}
      <ErrorAlert error={error} onDismiss={() => setError('')} />

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput
              label="Topic"
              required
              type="text"
              name="topic"
              value={formState.topic}
              onChange={(e) => dispatch({ type: 'SET_TOPIC', payload: e.target.value })}
              placeholder="e.g., Artificial Intelligence"
              error={error && error.includes('topic') ? error : ''}
              disabled={loading}
            />

            <FormInput
              label="Industry"
              type="text"
              name="industry"
              value={formState.industry}
              onChange={(e) => dispatch({ type: 'SET_INDUSTRY', payload: e.target.value })}
              placeholder="e.g., Technology, Marketing"
              disabled={loading}
            />

            <FormInput
              label="Number of Hashtags"
              type="number"
              name="count"
              value={formState.count}
              onChange={(e) => dispatch({ type: 'SET_COUNT', payload: e.target.value })}
              min={MIN_HASHTAGS}
              max={MAX_HASHTAGS}
              disabled={loading}
            />

            <ModelSelector
              models={MODELS}
              selectedModel={formState.model}
              onModelChange={(value) => dispatch({ type: 'SET_MODEL', payload: value })}
              disabled={loading}
            />

            {/* Form Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Hash size={18} />
                    <span>Generate Hashtags</span>
                  </>
                )}
              </button>
              {hashtags.length > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={loading}
                  className="px-4 btn-secondary flex items-center gap-2 disabled:opacity-50"
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Results */}
        <HashtagsDisplay
          hashtags={hashtags}
          hashtagString={hashtagString}
          loading={loading}
          onCopy={handleCopy}
          onRegenerate={handleSubmit}
        />
      </div>
    </div>
  )
}

export default HashtagGeneratorPage