'use strict';

// Creating a Data Store - Listening to textUpdate action
var Reflux = require('reflux');
var Net = require('./assets/js/collab-engine');



var Store = {
    maps: Reflux.createStore({

        init: function() {
            this.listenTo(Action.createMap, this.createMap);
            this.listenTo(Action.refreshMaps, this.getMaps);
        },

        createMap: function(map) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    method: 'POST',
                    url: hostPath('/maps'),
                    data: JSON.stringify(map),
                    success: (response) => {
                        if (response.status == 'ok') {
                            map.id = response.id;
                            this.data.push(map);

                            //Create Document with the correct ID
                            sjsConnection.get('map', map.id, function(error, doc) {
                                resolve(map);
                            });
                            this.setData(this.data);
                        } else {
                            reject();
                        }
                    },
                    error: reject,
                    dataType: 'json',
                    contentType: 'application/json'
                });
            });
        },

        getMaps: function() {
            $.ajax({
                url: hostPath('/maps'),
                success: (data) => {
                    this.setData(data);
                },
                error: () => {
                    this.setData(false);
                },
                dataType: 'json',
                contentType: 'application/json'
            });
        },

        setData: function(data) {
            if (data) {
                this.status = 'success';
                this.data = data;
            } else {
                this.status = 'fail';
            }

            this.trigger({
                status: this.status,
                data: this.data
            });
        }
    }),

    mapdata: Reflux.createStore({
        doc: null,
        i: 0,

        init() {
            this.listenTo(Action.openMap, this.openMap);
            this.listenTo(Action.closeMap, this.closeMap);
            this.listenTo(Action.newNode, this.newNode);
            this.listenTo(Action.newEdge, this.newEdge);
            this.listenTo(Action.docChanged, this.onDocChange);
        },

        openMap(id) {
            this.doc = sjsConnection.get('map', id);
            this.doc.subscribe();
            this.doc.on('created', Action.docCreated);
            this.doc.on('after op', (op, localSite) => {
                this.trigger(this.doc.snapshot)
            });
            // this.doc.on('remote op', Action.docChanged);

            this.doc.whenReady(() => {
                if (!this.doc.type) {
                    this.doc.create('json0', {
                        nodes: {
                            root: {text: 'Mind Map'}
                        },
                        edges: []
                    });
                }

                Action.docReady(id);

                Action.docChanged(id);
            });
        },

        closeMap() {
            this.doc.unsubscribe();
        },

        onDocChange() {
            console.debug('docChange');
            this.trigger(this.doc.snapshot);
        },

        // Generate next unique id based on user id
        nextId() {
            return sjsConnection.id + this.i++;
        },

        // Build op to create a node
        _nodeOp(key, node) {
            return {p:['nodes', key], oi:node};
        },

        // Build op to create an edge
        _edgeOp(edge) {
            return {p:['edges', this.doc.snapshot.edges.length], li:edge};
        },

        // Build op to replace a node
        _nodeUpdateOp(id, node) {
            return {p:['nodes', id], od: this.doc.snapshot.nodes[id], oi:node};
        },

        // Create a new node
        // key as a unique string id, node as { text }, edge as { a, b }
        newNode(key, node, edge) {
            var op = [
                this._nodeOp(key, node),
                this._edgeOp(edge)
            ];
            console.log('op', op);
            this.doc.submitOp(op);
        },

        // Get node by key
        getNode(id) {
            return this.doc.snapshot.nodes[id];
        },

        // Update a node
        // id is the key, node is { text }
        updateNode(id, node) {
            var op = [
                this._nodeUpdateOp(id, node)
            ];
            this.doc.submitOp(op);
        }
    })
};



module.exports = Store;