// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Wand2, Loader2, Copy, Check, ArrowDown } from 'lucide-react'
// import api from '../services/api.js'
// import toast from 'react-hot-toast'

// const models = [
//   { value: 'gemini', label: 'Google Gemini', icon: 'G' },
//   { value: 'llama', label: 'Meta Llama', icon: 'L' },
//   { value: 'qwen', label: 'Qwen', icon: 'Q' },
//   { value: 'mistral', label: 'Mistral', icon: 'M' },
// ]

// const PostImprovementPage = () => {
//   const [content, setContent] = useState('')
//   const [model, setModel] = useState('gemini')
//   const [result, setResult] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [copiedField, setCopiedField] = useState(null)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!content || content.trim().length < 10) {
//       toast.error('Please enter at least 10 characters')
//       return
//     }
//     setLoading(true)
//     try {
//       const response = await api.post('/improve/post', { content, model })
//       if (response.data.success) {
//         setResult(response.data.data)
//         toast.success('Post improved!')
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to improve post')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCopy = (text, field) => {
//     navigator.clipboard.writeText(text)
//     setCopiedField(field)
//     toast.success('Copied to clipboard!')
//     setTimeout(() => setCopiedField(null), 2000)
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-secondary-900">Post Improvement Agent</h1>
//         <p className="text-secondary-500 mt-1">Paste your LinkedIn post and get AI-powered improvements</p>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-6">
//         <div className="space-y-6">
//           <div className="card">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-secondary-700 mb-2">Your LinkedIn Post *</label>
//               <textarea
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="Paste your LinkedIn post here..."
//                 className="textarea-field"
//                 rows={8}
//                 required
//               />
//             </div>
//             <div className="mb-4">
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
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
//             >
//               {loading ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
//               {loading ? 'Improving...' : 'Improve My Post'}
//             </button>
//           </div>
//         </div>

//         <div>
//           <AnimatePresence>
//             {result && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="space-y-4"
//               >
//                 <div className="card">
//                   <div className="flex items-center justify-between mb-3">
//                     <h3 className="font-semibold text-secondary-900 flex items-center gap-2">
//                       <Wand2 size={18} className="text-warning-600" />
//                       Improved Post
//                     </h3>
//                     <button
//                       onClick={() => handleCopy(result.improvedPost, 'improved')}
//                       className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
//                     >
//                       {copiedField === 'improved' ? <Check size={16} className="text-success-600" /> : <Copy size={16} className="text-secondary-600" />}
//                     </button>
//                   </div>
//                   <div className="bg-secondary-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-secondary-800 leading-relaxed">
//                     {result.improvedPost}
//                   </div>
//                 </div>

//                 {result.betterHooks && (
//                   <div className="card">
//                     <div className="flex items-center justify-between mb-3">
//                       <h3 className="font-semibold text-secondary-900 text-sm">Better Hooks</h3>
//                       <button
//                         onClick={() => handleCopy(result.betterHooks, 'hooks')}
//                         className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
//                       >
//                         {copiedField === 'hooks' ? <Check size={16} className="text-success-600" /> : <Copy size={16} className="text-secondary-600" />}
//                       </button>
//                     </div>
//                     <div className="bg-secondary-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-secondary-700">
//                       {result.betterHooks}
//                     </div>
//                   </div>
//                 )}

//                 {result.betterCta && (
//                   <div className="card">
//                     <div className="flex items-center justify-between mb-3">
//                       <h3 className="font-semibold text-secondary-900 text-sm">Better CTAs</h3>
//                       <button
//                         onClick={() => handleCopy(result.betterCta, 'cta')}
//                         className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
//                       >
//                         {copiedField === 'cta' ? <Check size={16} className="text-success-600" /> : <Copy size={16} className="text-secondary-600" />}
//                       </button>
//                     </div>
//                     <div className="bg-secondary-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-secondary-700">
//                       {result.betterCta}
//                     </div>
//                   </div>
//                 )}

//                 {result.formattingTips && (
//                   <div className="card">
//                     <div className="flex items-center justify-between mb-3">
//                       <h3 className="font-semibold text-secondary-900 text-sm">Formatting Tips</h3>
//                       <button
//                         onClick={() => handleCopy(result.formattingTips, 'formatting')}
//                         className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
//                       >
//                         {copiedField === 'formatting' ? <Check size={16} className="text-success-600" /> : <Copy size={16} className="text-secondary-600" />}
//                       </button>
//                     </div>
//                     <div className="bg-secondary-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-secondary-700">
//                       {result.formattingTips}
//                     </div>
//                   </div>
//                 )}

//                 {result.engagementBoosters && (
//                   <div className="card">
//                     <div className="flex items-center justify-between mb-3">
//                       <h3 className="font-semibold text-secondary-900 text-sm">Engagement Boosters</h3>
//                       <button
//                         onClick={() => handleCopy(result.engagementBoosters, 'engagement')}
//                         className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
//                       >
//                         {copiedField === 'engagement' ? <Check size={16} className="text-success-600" /> : <Copy size={16} className="text-secondary-600" />}
//                       </button>
//                     </div>
//                     <div className="bg-secondary-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-secondary-700">
//                       {result.engagementBoosters}
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PostImprovementPage





import { useState, useCallback, useReducer } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, Loader2, Copy, Check, AlertCircle, RefreshCw } from 'lucide-react'
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

const MIN_CONTENT_LENGTH = 10
const MAX_CONTENT_LENGTH = 5000
const COPY_FEEDBACK_DURATION = 2000

// ============================================================================
// Form State Reducer
// ============================================================================

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTENT':
      return { ...state, content: action.payload.slice(0, MAX_CONTENT_LENGTH) }
    case 'SET_MODEL':
      return { ...state, model: action.payload }
    case 'RESET':
      return { content: '', model: 'gemini' }
    default:
      return state
  }
}

// ============================================================================
// Sub-components
// ============================================================================

const FormTextarea = ({ label, required, error, charCount, maxChars, ...props }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <label className="block text-sm font-medium text-secondary-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <span className="text-xs text-secondary-500">
        {charCount} / {maxChars}
      </span>
    </div>
    <textarea
      {...props}
      className={`textarea-field resize-none ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
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

const ResultCard = ({ title, content, icon: Icon, fieldName, onCopy, copied, isPrimary = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`card ${isPrimary ? 'ring-2 ring-primary-200' : ''}`}
  >
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={18} className={isPrimary ? 'text-primary-600' : 'text-secondary-600'} />}
        <h3 className={`font-semibold ${isPrimary ? 'text-secondary-900' : 'text-secondary-700'}`}>
          {title}
        </h3>
      </div>
      <button
        onClick={() => onCopy(content, fieldName)}
        disabled={copied}
        className="p-2 rounded-lg hover:bg-secondary-100 transition-colors disabled:opacity-50"
        aria-label={`Copy ${title}`}
        title="Copy to clipboard"
      >
        {copied === fieldName ? (
          <Check size={16} className="text-success-600" />
        ) : (
          <Copy size={16} className="text-secondary-600" />
        )}
      </button>
    </div>
    <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
      <p className="whitespace-pre-wrap text-sm text-secondary-700 leading-relaxed font-mono">
        {content}
      </p>
    </div>
  </motion.div>
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

const LoadingPlaceholder = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="card animate-pulse">
        <div className="h-6 bg-secondary-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-secondary-200 rounded"></div>
          <div className="h-4 bg-secondary-200 rounded w-5/6"></div>
          <div className="h-4 bg-secondary-200 rounded w-4/6"></div>
        </div>
      </div>
    ))}
  </div>
)

// ============================================================================
// Main Component
// ============================================================================

const PostImprovementPage = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    content: '',
    model: 'gemini',
  })

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copiedField, setCopiedField] = useState(null)
  const [error, setError] = useState('')

  const validateContent = useCallback(() => {
    const trimmedContent = formState.content.trim()

    if (!trimmedContent) {
      setError('Please enter your LinkedIn post')
      return false
    }

    if (trimmedContent.length < MIN_CONTENT_LENGTH) {
      setError(`Post must be at least ${MIN_CONTENT_LENGTH} characters (currently ${trimmedContent.length})`)
      return false
    }

    if (trimmedContent.length > MAX_CONTENT_LENGTH) {
      setError(`Post exceeds maximum length of ${MAX_CONTENT_LENGTH} characters`)
      return false
    }

    setError('')
    return true
  }, [formState.content])

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault?.()

      if (!validateContent()) return

      setLoading(true)
      setError('')

      try {
        const response = await api.post('/improve/post', {
          content: formState.content.trim(),
          model: formState.model,
        })

        if (response.data?.success && response.data?.data) {
          setResult(response.data.data)
          toast.success('✨ Post improved successfully!')
        } else {
          throw new Error(response.data?.message || 'Failed to improve post')
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || 'Failed to improve post'
        setError(errorMessage)
        toast.error(errorMessage)
        console.error('Post improvement error:', error)
      } finally {
        setLoading(false)
      }
    },
    [formState, validateContent]
  )

  const handleCopy = useCallback((text, fieldName) => {
    if (!text) {
      toast.error('Nothing to copy')
      return
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedField(fieldName)
        toast.success('Copied to clipboard!')
        setTimeout(() => setCopiedField(null), COPY_FEEDBACK_DURATION)
      })
      .catch(() => {
        toast.error('Failed to copy')
      })
  }, [])

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' })
    setResult(null)
    setError('')
    setLoading(false)
    setCopiedField(null)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Post Improvement Agent</h1>
        <p className="text-secondary-500 mt-1">
          Paste your LinkedIn post and get AI-powered suggestions to boost engagement
        </p>
      </div>

      {/* Error Alert */}
      <ErrorAlert error={error} onDismiss={() => setError('')} />

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-5">
              <FormTextarea
                label="Your LinkedIn Post"
                required
                name="content"
                value={formState.content}
                onChange={(e) => dispatch({ type: 'SET_CONTENT', payload: e.target.value })}
                placeholder="Paste your LinkedIn post here and let AI improve it..."
                charCount={formState.content.length}
                maxChars={MAX_CONTENT_LENGTH}
                error={error && error.includes('Post') ? error : ''}
                disabled={loading}
                rows={10}
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
                      <span>Improving...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 size={18} />
                      <span>Improve My Post</span>
                    </>
                  )}
                </button>
                {result && (
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={loading}
                    className="px-4 btn-secondary flex items-center gap-2 disabled:opacity-50"
                  >
                    <RefreshCw size={16} />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Info Card */}
          <div className="card bg-blue-50 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Tips for Best Results</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use your actual LinkedIn post for accurate suggestions</li>
              <li>• Include context about your industry or niche</li>
              <li>• Experiment with different AI models for varied perspectives</li>
              <li>• Keep posts between {MIN_CONTENT_LENGTH} and {MAX_CONTENT_LENGTH} characters</li>
            </ul>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingPlaceholder />
            ) : result ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Primary Result */}
                <ResultCard
                  title="Improved Post"
                  content={result.improvedPost || ''}
                  icon={Wand2}
                  fieldName="improved"
                  onCopy={handleCopy}
                  copied={copiedField}
                  isPrimary={true}
                />

                {/* Optional Results */}
                {result.betterHooks && (
                  <ResultCard
                    title="Better Opening Hooks"
                    content={result.betterHooks}
                    fieldName="hooks"
                    onCopy={handleCopy}
                    copied={copiedField}
                  />
                )}

                {result.betterCta && (
                  <ResultCard
                    title="Stronger CTAs"
                    content={result.betterCta}
                    fieldName="cta"
                    onCopy={handleCopy}
                    copied={copiedField}
                  />
                )}

                {result.formattingTips && (
                  <ResultCard
                    title="Formatting Tips"
                    content={result.formattingTips}
                    fieldName="formatting"
                    onCopy={handleCopy}
                    copied={copiedField}
                  />
                )}

                {result.engagementBoosters && (
                  <ResultCard
                    title="Engagement Boosters"
                    content={result.engagementBoosters}
                    fieldName="engagement"
                    onCopy={handleCopy}
                    copied={copiedField}
                  />
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default PostImprovementPage