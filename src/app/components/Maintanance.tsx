"use client";

export default function Maintenance() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#354338] text-white px-6 text-center">

            {/* Logo */}
            <img
                src="/KPG-LOGO.png"
                alt="Kopigo Logo"
                className="w-24 mb-8 opacity-90"
            />

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4 tracking-wide">
                Website Under Maintenance
            </h1>

            {/* Description */}
            <p className="max-w-xl text-white/80 mb-6 leading-relaxed">
                Kami sedang melakukan pembaruan sistem untuk meningkatkan pengalaman Anda.
                Silakan kembali dalam beberapa waktu ke depan.
            </p>

            {/* Contact */}
            <div className="text-white/80 text-sm space-y-2">
                <p>
                    Untuk informasi lebih lanjut, silakan hubungi:
                </p>

                <a
                    href="mailto:contact@kopigoasia.com"
                    className="underline hover:text-white transition"
                >
                    contact@kopigoasia.com
                </a>

                <div>
                    <a
                        href="https://www.instagram.com/therealkopigo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white transition"
                    >
                        Instagram @therealkopigo
                    </a>
                </div>
            </div>

            {/* Subtle Footer */}
            <div className="absolute bottom-6 text-xs text-white/50">
                © {new Date().getFullYear()} Kopigo. All rights reserved.
            </div>
        </div>
    );
}