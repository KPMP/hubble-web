import React, { Component } from 'react';
import { Facet } from "@elastic/react-search-ui";
import { MultiCheckboxFacet } from "@elastic/react-search-ui-views";
import { Col, Container, Row, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody } from "reactstrap";

class AllFacets extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <Container id="spatial-filter" className="mt-3 rounded border shadow-sm spatial-filter-panel container-max">
                <Row className='mb-2'>
                    <Col id="release">
                        <Facet field="releaseversion" filterType="any" label="" show="1" view={MultiCheckboxFacet} />
                    </Col>
                </Row>

                <UncontrolledAccordion
                    defaultOpen={['1', '2', '3']}
                    stayOpen>
                    <AccordionItem>
                        <AccordionHeader targetId="1">
                            Participant metadata
                        </AccordionHeader>
                        <AccordionBody accordionId="1">
                            <UncontrolledAccordion
                                flush
                                defaultOpen={['4']}
                                stayOpen className='inner-accordion'>
                                <AccordionItem>
                                    <AccordionHeader targetId="4">
                                        Participant ID
                                    </AccordionHeader>
                                    <AccordionBody accordionId="4">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet inputProps={{ placeholder: "placeholder" }}
                                                    isFilterable={true} field="redcapid"
                                                    label=""
                                                    filterType="any"
                                                    view={(props) => <MultiCheckboxFacet {...props} searchPlaceholder={"Search..."} />} />
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="5">
                                        Age
                                    </AccordionHeader>
                                    <AccordionBody accordionId="5">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='age' label='' filterType='any' view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="6">
                                        Enrollment Category
                                    </AccordionHeader>
                                    <AccordionBody accordionId="6">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='enrollmentcategory'
                                                    label='' filterType='any'
                                                    view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="7">
                                        Primary Adjudicated Category
                                    </AccordionHeader>
                                    <AccordionBody accordionId="7">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='primaryadjudicatedcategory' label='' filterType='any' view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="8">
                                        Race
                                    </AccordionHeader>
                                    <AccordionBody accordionId="8">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='race' label='' filterType='any' view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="9">
                                        Sex
                                    </AccordionHeader>
                                    <AccordionBody accordionId="9">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='sex' label='' filterType='any' view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                            </UncontrolledAccordion>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="2">
                            Clinical metadata
                        </AccordionHeader>
                        <AccordionBody accordionId="2">
                            <UncontrolledAccordion flush stayOpen className='inner-accordion'>
                                <AccordionItem>
                                    <AccordionHeader targetId="10">
                                        A1c
                                    </AccordionHeader>
                                    <AccordionBody accordionId="10">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='a1c' label='' filterType='any' view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody></AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="11">
                                        Albuminuria
                                    </AccordionHeader>
                                    <AccordionBody accordionId="11">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='albuminuria' label='' filterType='any' view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody></AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="12">
                                        Baseline eGFR
                                    </AccordionHeader>
                                    <AccordionBody accordionId="12">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='baselineegfr' label='' filterType='any' view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody></AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="13">
                                        Diabetes Duration
                                    </AccordionHeader>
                                    <AccordionBody accordionId="13">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='diabetesduration' label='' filterType='any' view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody></AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="14">
                                        Diabetes History
                                    </AccordionHeader>
                                    <AccordionBody accordionId="14">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='diabeteshistory' label='' filterType='any' view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody></AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="15">
                                        Hypertension Duration
                                    </AccordionHeader>
                                    <AccordionBody accordionId="15">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='hypertensionduration' label='' filterType='any' view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody></AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="16">
                                        Hypertension History
                                    </AccordionHeader>
                                    <AccordionBody accordionId="16">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='hypertensionhistory' label='' filterType='any' view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody></AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="17">
                                        KDIGO Stage
                                    </AccordionHeader>
                                    <AccordionBody accordionId="17">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='kdigostage' label='' filterType='any' view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody></AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="18">
                                        RAAS Blockade
                                    </AccordionHeader>
                                    <AccordionBody accordionId="18">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='onraasblockade' label='' filterType='any' view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody></AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="19">
                                        Proteinuria
                                    </AccordionHeader>
                                    <AccordionBody accordionId="19">
                                        <Row className='mb-2'>
                                            <Col>
                                                <Facet field='proteinuria' label='' filterType='any' view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                            </UncontrolledAccordion>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="3">
                            Dataset metadata
                        </AccordionHeader>
                        <AccordionBody accordionId="3">
                            <UncontrolledAccordion flush stayOpen className='inner-accordion'>
                                <AccordionItem>
                                    <AccordionHeader targetId="25">
                                        Experimental Strategy
                                    </AccordionHeader>
                                    <AccordionBody accordionId="25">
                                        <Row className="mb-2">
                                            <Col>
                                                <Facet field="experimentalstrategy" label="" filterType="any"
                                                    view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="26">
                                        Image Type
                                    </AccordionHeader>
                                    <AccordionBody accordionId="26">
                                        <Row className="mb-2">
                                            <Col>
                                                <Facet field="imagetype" label="" filterType="any" show="10" view={MultiCheckboxFacet} />
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                            </UncontrolledAccordion>
                        </AccordionBody>
                    </AccordionItem>
                </UncontrolledAccordion>
            </Container>
        );
    }
}


export default AllFacets;
