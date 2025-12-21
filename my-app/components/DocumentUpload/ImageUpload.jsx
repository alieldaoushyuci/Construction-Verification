import React, { useRef, useState } from 'react';

export default function ImageUpload({ uploadUrl = '/upload', onUploaded } = {}) {
    const inputRef = useRef(null);
    const [status, setStatus] = useState('idle'); // 'idle' | 'uploading' | 'success' | 'error'
    const [error, setError] = useState(null);

    const openPicker = (e) => {
        // Prevent parent carousel drag from stealing this interaction
        e.stopPropagation();
        inputRef.current?.click();
    };

    const handleChange = async (e) => {
        e.stopPropagation();
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        setStatus('uploading');
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const res = await fetch(uploadUrl, {
                method: 'POST',
                body: formData
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) throw new Error(data.message || `Upload failed (${res.status})`);

            setStatus('success');
            if (typeof onUploaded === 'function') onUploaded(data);
        } catch (err) {
            setError(err.message || 'Upload error');
            setStatus('error');
        }
    };

    return (
        <div className="image-upload" onPointerDown={(e) => e.stopPropagation()}>
            <input
                ref={inputRef}
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleChange}
            />

            <button type="button" className="upload-button" onClick={openPicker}>
                {status === 'uploading' ? 'Uploading...' : 'Upload Image'}
            </button>

            {status === 'success' && <div className="upload-success">Upload successful</div>}
            {status === 'error' && <div className="upload-error">Error: {error}</div>}
        </div>
    );
}