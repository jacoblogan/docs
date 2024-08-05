import references from '@/references/references.json'
import { ReferencePage } from './ReferencePage';
import nestedReferences from '@/references/nestedReferences.json';
import { createContext, useState, useEffect } from 'react';
import { ApiModal } from './ApiModal';

export const TypeContext = createContext({});

export const ReferencePages = ({ platform, category }) => {
    const [modalData, setModalData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const functions = Object.keys(nestedReferences);

    const modalOpen = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }

    const value = {
        setModalData,
        modalOpen
    }
    return (
        <>
            <TypeContext.Provider value={value}>
                <ApiModal data={modalData} showModal={showModal} close={closeModal} />
                {functions.map((fn) => <ReferencePage platform={platform} category={category} fn={fn} key={`${platform}-${category}`} />)}
            </TypeContext.Provider>
        </>
    )
}
