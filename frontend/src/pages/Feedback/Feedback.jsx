import { useState } from "react"

function Feedback() {
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!rating || !message.trim()) {
            return
        }

        setSubmitted(true)
    }

    const handleReset = () => {
        setRating(0)
        setMessage("")
        setSubmitted(false)
    }

    return (
        <main className="min-h-screen bg-white px-4 py-16 md:py-24">

            <div className="mx-auto max-w-5xl">

                {/* Header */}

                <div className="max-w-3xl">

                    <p className="font-mono text-sm text-gray-500">
                        / feedback
                    </p>

                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                        Tell us what you think.
                    </h1>

                    <p className="mt-5 text-base leading-7 text-gray-600 md:text-lg">
                        Your feedback helps us understand what works well
                        and what can be improved in the experience.
                    </p>

                </div>


                {/* UI Demo Notice */}

                <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">

                    <div className="flex gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm text-white">
                            i
                        </div>

                        <div>

                            <p className="font-medium text-blue-900">
                                UI Preview
                            </p>

                            <p className="mt-1 text-sm leading-6 text-blue-700">
                                This feedback form is currently for UI
                                demonstration purposes only. Backend
                                integration will be added later.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Feedback Card */}

                <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">

                    {/* Left Info */}

                    <div className="rounded-3xl bg-gray-950 p-7 text-white md:p-8">

                        <p className="font-mono text-xs uppercase tracking-widest text-gray-500">
                            Developer Store
                        </p>

                        <h2 className="mt-5 text-2xl font-semibold">
                            Help us improve the experience.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-gray-400">
                            Whether something worked perfectly or could be
                            better, your feedback gives us a better idea of
                            what to improve next.
                        </p>


                        <div className="mt-10 space-y-5">

                            <FeedbackPoint
                                number="01"
                                text="Share your overall experience"
                            />

                            <FeedbackPoint
                                number="02"
                                text="Tell us what could be improved"
                            />

                            <FeedbackPoint
                                number="03"
                                text="Help shape future updates"
                            />

                        </div>

                    </div>


                    {/* Form */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm md:p-8">

                        {!submitted ? (
                            <form onSubmit={handleSubmit}>

                                {/* Rating */}

                                <div>

                                    <label className="text-sm font-medium text-gray-900">
                                        How was your experience?
                                    </label>

                                    <div className="mt-4 flex gap-2">

                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() =>
                                                    setRating(star)
                                                }
                                                className={`flex h-11 w-11 items-center justify-center rounded-xl border text-lg transition ${rating >= star
                                                        ? "border-gray-900 bg-gray-900 text-white"
                                                        : "border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-400 hover:text-gray-700"
                                                    }`}
                                                aria-label={`Rate ${star} out of 5`}
                                            >
                                                ★
                                            </button>
                                        ))}

                                    </div>

                                    <p className="mt-3 font-mono text-xs text-gray-400">
                                        {rating === 0
                                            ? "Select a rating"
                                            : `${rating} out of 5 selected`}
                                    </p>

                                </div>


                                {/* Message */}

                                <div className="mt-8">

                                    <label
                                        htmlFor="feedback"
                                        className="text-sm font-medium text-gray-900"
                                    >
                                        Your feedback
                                    </label>

                                    <textarea
                                        id="feedback"
                                        value={message}
                                        onChange={(event) =>
                                            setMessage(event.target.value)
                                        }
                                        placeholder="Tell us about your experience..."
                                        rows={7}
                                        className="mt-3 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900"
                                    />

                                    <p className="mt-2 text-right font-mono text-xs text-gray-400">
                                        {message.length} characters
                                    </p>

                                </div>


                                {/* Submit */}

                                <button
                                    type="submit"
                                    className="mt-6 w-full rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                                    disabled={!rating || !message.trim()}
                                >
                                    Submit Feedback →
                                </button>


                                <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                                    Demo form — no feedback is currently
                                    stored or sent to a backend.
                                </p>

                            </form>
                        ) : (
                            /* Success State */

                            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">

                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-2xl text-green-600">
                                    ✓
                                </div>

                                <p className="mt-6 font-mono text-xs uppercase tracking-widest text-gray-400">
                                    Thank you
                                </p>

                                <h2 className="mt-3 text-2xl font-semibold text-gray-900">
                                    Feedback received.
                                </h2>

                                <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
                                    This is currently a UI demonstration,
                                    so your feedback has not been sent or
                                    stored anywhere.
                                </p>

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="mt-7 rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
                                >
                                    Submit Another →
                                </button>

                            </div>
                        )}

                    </div>

                </div>


                {/* Bottom Note */}

                <div className="mt-8 flex flex-col gap-2 border-t border-gray-100 pt-6 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">

                    <span className="font-mono">
                        feedback / ui-preview
                    </span>

                    <span>
                        Backend integration can be added later.
                    </span>

                </div>

            </div>

        </main>
    )
}


/* ================= Feedback Point ================= */

function FeedbackPoint({ number, text }) {
    return (
        <div className="flex items-center gap-4">

            <span className="font-mono text-xs text-gray-600">
                {number}
            </span>

            <span className="text-sm text-gray-300">
                {text}
            </span>

        </div>
    )
}


export default Feedback