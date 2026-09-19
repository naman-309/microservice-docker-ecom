import { useAuth } from "../../context/AuthContext"

function Profile() {

    const { user } = useAuth()

    if (!user) {
        return (
            <main className="min-h-screen px-4 py-16">

                <div className="mx-auto max-w-3xl">

                    <p className="font-mono text-sm text-gray-400">
                        / profile
                    </p>

                    <h1 className="mt-4 text-3xl font-bold text-gray-900">
                        Please login first
                    </h1>

                    <p className="mt-3 text-gray-500">
                        You need to be logged in to view your profile.
                    </p>

                </div>

            </main>
        )
    }

    return (
        <main className="min-h-screen px-4 py-16">

            <div className="mx-auto max-w-3xl">

                {/* Page Header */}
                <div>

                    <p className="font-mono text-sm text-gray-400">
                        / profile
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
                        Your Profile
                    </h1>

                    <p className="mt-4 text-gray-600">
                        View your account information and access level.
                    </p>

                </div>

                {/* Profile Card */}
                <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    {/* Avatar */}
                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                            {user.role?.charAt(0).toUpperCase()}
                        </div>

                        <div>

                            <h2 className="text-xl font-semibold text-gray-900">
                                {user.role === "admin"
                                    ? "Administrator"
                                    : "User"
                                }
                            </h2>

                            <p className="text-sm text-gray-500">
                                Account profile
                            </p>

                        </div>

                    </div>

                    {/* Account Information */}
                    <div className="mt-8 border-t border-gray-100 pt-6">

                        <h3 className="text-sm font-semibold text-gray-900">
                            Account Information
                        </h3>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2">

                            {/* User ID */}
                            <div>

                                <p className="font-mono text-xs text-gray-400">
                                    USER ID
                                </p>

                                <p className="mt-1 break-all text-sm font-medium text-gray-900">
                                    {user.userId}
                                </p>

                            </div>

                            {/* Role */}
                            <div>

                                <p className="font-mono text-xs text-gray-400">
                                    ROLE
                                </p>

                                <span
                                    className={`mt - 1 inline - block rounded - full px - 3 py - 1 text - xs font - medium ${user.role === "admin"
                                            ? "bg-black text-white"
                                            : "bg-gray-100 text-gray-700"
                                        } `}
                                >
                                    {user.role}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    )
}

export default Profile
