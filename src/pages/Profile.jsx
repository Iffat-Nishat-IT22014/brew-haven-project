import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, User, Edit } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#1c1410] text-[#f5e9dc] px-4 py-12">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <h1 className="text-4xl font-serif font-bold text-[#c69c6d] mb-10">
                    My Profile
                </h1>

                {/* Profile Card */}
                <div className="bg-[#2a1f1a] rounded-3xl p-8 border border-[#3b2a23] shadow-xl">

                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row items-center gap-6">

                        {/* Avatar */}
                        <div className="relative">
                            <img
                                src={user?.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                alt="profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-[#6f4e37]"
                            />

                            <button className="absolute bottom-2 right-2 bg-[#6f4e37] p-2 rounded-full hover:bg-[#8b5e3c] transition">
                                <Edit size={16} />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold">
                                {user?.name || "Your Name"}
                            </h2>
                            <p className="text-[#c69c6d] mt-1">
                                {user?.role || "Customer"}
                            </p>
                            <p className="text-sm text-[#d6c4b2]/70 mt-2 flex items-center justify-center md:justify-start gap-2">
                                <Mail size={16} /> {user?.email || "example@email.com"}
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#3b2a23] my-8"></div>

                    {/* Details */}
                    <div className="grid md:grid-cols-2 gap-6">

                        <div className="bg-[#1c1410] p-5 rounded-2xl border border-[#3b2a23]">
                            <p className="text-sm text-[#c69c6d] mb-1">Full Name</p>
                            <p className="font-semibold">{user?.name || "N/A"}</p>
                        </div>

                        <div className="bg-[#1c1410] p-5 rounded-2xl border border-[#3b2a23]">
                            <p className="text-sm text-[#c69c6d] mb-1">Email Address</p>
                            <p className="font-semibold">{user?.email || "N/A"}</p>
                        </div>

                        <div className="bg-[#1c1410] p-5 rounded-2xl border border-[#3b2a23]">
                            <p className="text-sm text-[#c69c6d] mb-1">Account Type</p>
                            <p className="font-semibold capitalize">
                                {user?.role || "User"}
                            </p>
                        </div>

                        <div className="bg-[#1c1410] p-5 rounded-2xl border border-[#3b2a23]">
                            <p className="text-sm text-[#c69c6d] mb-1">Member Since</p>
                            <p className="font-semibold">
                                {user?.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString()
                                    : "N/A"}
                            </p>
                        </div>

                    </div>

                    {/* Button */}
                    <div className="mt-10 text-right">
                        <button className="bg-[#6f4e37] hover:bg-[#8b5e3c] px-6 py-2 rounded-full font-semibold transition">
                            Edit Profile
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;